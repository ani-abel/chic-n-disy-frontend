<script>
	import { AxiosError } from 'axios';
  import { page } from '$app/stores';
	import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
	import { auth } from '../../stores/cart.store';
	import { apiLogin } from '../../api-requests/request';
	import { AppRole, displayMessage } from '../../utils';

  export let open = false;

  const dispatch = createEventDispatcher();

  let showPassword = false;
  let loading = false;

  function togglePassword() {
    showPassword = !showPassword;
  }

  function handleClose() {
    dispatch('close');
  }

  const formData = {
		email: null,
		password: null
	};

  const resetForm = () => {
    formData.email = null;
    formData.password = null;
  }

	const handleSubmit = (/** @type {Event} */ event) => {
		(async () => {
			try {
				event.preventDefault();

        loading = true;

				if (formData?.email && formData?.password) {
					const response = await apiLogin(formData.email, formData.password);
					const {
						data: {
							userId,
							token,
							role,
							email,
							user: { firstName, lastName }
						}
					} = response;

          loading = false;

					const newUser = { 
            role, 
            userId, 
            email, 
            token, 
            firstName, 
            lastName, 
            name: `${firstName} ${lastName}` 
          };

          auth.login(newUser);

          resetForm();
          handleClose();

					const pageData = $page;
					const queryParams = pageData.url.searchParams;
					if (queryParams) {
						const redirect = queryParams.get('redirect');
						if (redirect) {
							goto(redirect);
						} else {
							if (role === AppRole.ADMIN) {
								goto('/auth/admin/order');
							} else {
								goto('/auth/customer/orders');
							}
						}
					}
				}
			} catch (ex) {
        loading = false;
        
				if (ex instanceof AxiosError) {
					const axiosErrorObject = ex.response?.data;
					displayMessage({
						message: axiosErrorObject?.message,
						header: 'Error',
						type: 'danger'
					});
				}
				throw ex;
			}
		})();
	};

  /**
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (e.key === 'Escape' && open) {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="fixed inset-0 z-[60]">
    <button
      type="button"
      aria-label="Close modal background"
      class="absolute inset-0 bg-ink/50 w-full h-full border-none cursor-default"
      on:click={handleClose}
    ></button>

    <div class="relative min-h-full flex items-center justify-center p-5 pointer-events-none">
      <div
        class="modal-panel pointer-events-auto w-full max-w-[420px] bg-paper border border-line max-h-[90vh] overflow-y-auto no-scrollbar transition-all duration-300 transform"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loginModalTitle"
      >
        <div class="flex items-center justify-between px-7 pt-7">
          <h2 id="loginModalTitle" class="font-serif text-[22px]">Log In</h2>
          <button
            type="button"
            aria-label="Close login"
            on:click={handleClose}
            class="w-8 h-8 flex items-center justify-center -mr-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3">
              <line x1="1" y1="1" x2="15" y2="15"/>
              <line x1="15" y1="1" x2="1" y2="15"/>
            </svg>
          </button>
        </div>

        <form on:submit|preventDefault={handleSubmit} class="px-7 pb-8 pt-6">
          <div class="mb-5">
            <label for="loginEmail" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
              Email Address <span class="text-clay">*</span>
            </label>
            <input
              id="loginEmail"
              type="email"
              required
              bind:value={formData.email}
              placeholder="you@example.com"
              class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
            />
          </div>

          <div class="mb-2">
            <label for="loginPassword" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">Password</label>
            <div class="relative">
            {#if showPassword}
              <input id="loginPassword" 
                type="text" 
                required 
                bind:value={formData.password}
                placeholder="Enter your password"
                class="w-full bg-transparent border border-line px-4 py-3 pr-16 text-[14px] placeholder:text-charcoal/40 focus:outline-none" 
              />
              {:else}
              <input id="loginPassword" 
                type="password" 
                required 
                bind:value={formData.password}
                placeholder="Enter your password"
                class="w-full bg-transparent border border-line px-4 py-3 pr-16 text-[14px] placeholder:text-charcoal/40 focus:outline-none" 
              />
              {/if}
              <button type="button" 
                on:click={togglePassword}
                data-toggle-password="loginPassword" 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] tracking-[0.03em] text-charcoal">
                Show
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            class="w-full mt-6 bg-ink text-paper py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>

          <p class="text-center text-[13px] text-charcoal mt-6">
            Don't have an account?
            <button
              type="button"
              on:click={() => { handleClose(); dispatch('switchToSignup'); }}
              class="text-ink underline-grow ml-1"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
{/if}