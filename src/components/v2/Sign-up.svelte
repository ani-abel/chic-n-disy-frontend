<script>
  import { AxiosError } from 'axios';
  import { createEventDispatcher } from 'svelte';
	import { AppRole, displayMessage } from '../../utils';
	import { createUserSignup } from '../../api-requests/request';

  export let open = false;

  const dispatch = createEventDispatcher();
  let showPassword = false;
  let loading = false;

	const formData = {
		email: null,
		phoneNumber: null,
		password: null,
		firstName: null,
    lastName: null
	};

	const resetForm = () => {
		formData.email = null;
		formData.password = null;
		formData.firstName = null;
    formData.lastName = null;
		formData.phoneNumber = null;
	};

	const handleSubmit = (/** @type {Event} */ event) => {
		event.preventDefault();
    
    loading = true;
		(async () => {
			try {
				let /** @type {string} */ lastName;
				const /** @type {any} */ payload = {
						password: formData.password,
						role: AppRole.CUSTOMER,
						email: formData.email,
						phoneNumber: formData.phoneNumber,
						firstName: formData.firstName,
            lastName: formData.lastName,
					};
				const result = await createUserSignup(payload);
				if (result?.success) {
          loading = false;

					const message = result.message ?? 'Account created. Welcome to Chikndisy.';
					displayMessage({
						message,
						type: 'success',
						header: message
					});

          setTimeout(() => {
            resetForm();
            handleClose();
            dispatch('switchToLogin');
          }, 900);
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

  function togglePassword() {
    showPassword = !showPassword;
  }

  function handleClose() {
    dispatch('close');
  }

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
        aria-labelledby="signupModalTitle"
      >
        <div class="flex items-center justify-between px-7 pt-7">
          <h2 id="signupModalTitle" class="font-serif text-[22px]">Create Account</h2>
          <button
            type="button"
            aria-label="Close signup"
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
            <label for="signupFName" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
              First Name <span class="text-clay">*</span>
            </label>
            <input
              id="signupFName"
              type="text"
              required
              bind:value={formData.firstName}
              placeholder="Jerome"
              class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
            />
          </div>

          <div class="mb-5">
            <label for="signupLName" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
              Last Name <span class="text-clay">*</span>
            </label>
            <input
              id="signupLName"
              type="text"
              required
              bind:value={formData.lastName}
              placeholder="Olaniyi"
              class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
            />
          </div>

          <div class="mb-5">
            <label for="signupEmail" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
              Email Address <span class="text-clay">*</span>
            </label>
            <input
              id="signupEmail"
              type="email"
              required
              bind:value={formData.email}
              placeholder="you@example.com"
              class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
            />
          </div>

          <div class="mb-5">
            <label for="signupPhone" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
              Phone Number <span class="text-clay">*</span>
            </label>
            <input
              id="signupPhone"
              type="tel"
              required
              bind:value={formData.phoneNumber}
              placeholder="+234 800 000 0000"
              class="w-full bg-transparent border border-line px-4 py-3 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
            />
          </div>

          <div class="mb-2">
            <label for="signupPassword" class="block text-[13px] tracking-[0.04em] text-charcoal mb-2">
              Password <span class="text-clay">*</span>
            </label>
            <div class="relative">
              {#if showPassword}
                <input
                  id="signupPassword"
                  type="text"
                  required
                  minlength="8"
                  bind:value={formData.password}
                  placeholder="At least 8 characters"
                  class="w-full bg-transparent border border-line px-4 py-3 pr-16 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
                />
              {:else}
                <input
                  id="signupPassword"
                  type="password"
                  required
                  minlength="8"
                  bind:value={formData.password}
                  placeholder="At least 8 characters"
                  class="w-full bg-transparent border border-line px-4 py-3 pr-16 text-[14px] placeholder:text-charcoal/40 focus:outline-none"
                />
              {/if}
              <button
                type="button"
                on:click={togglePassword}
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] tracking-[0.03em] text-charcoal"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            class="w-full mt-6 bg-ink text-paper py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>

          <p class="text-center text-[13px] text-charcoal mt-6">
            Already have an account?
            <button
              type="button"
              on:click={() => { 
                handleClose(); 
                dispatch('switchToLogin'); 
              }}
              class="text-ink underline-grow ml-1"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
{/if}