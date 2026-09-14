<script>
  import { get } from 'svelte/store';
	import { AxiosError } from 'axios';
	import { onMount, createEventDispatcher} from 'svelte';
  import { AppRole, displayMessage, getItemFromLocalStorage } from '../../utils';
  import { cart, cartCount, cartSubtotal, cartOpen, formatNaira } from '../../stores/cart.store';
	import { orderCheckout, validateOrderBeforePayment, initiatePaystackPayment } from '../../api-requests/request';
  
  let /*** @type {any} */ user;

  const dispatch = createEventDispatcher();

	onMount(() => {
		user = getItemFromLocalStorage('ecommerce-user', true);
	});
  
    const closeCart = () => {
      cartOpen.set(false);
      document.body.style.overflow = '';
    }
  
    $: if ($cartOpen) {
      document.body.style.overflow = 'hidden';
    }
  
    const handleKeydown = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === 'Escape' && $cartOpen) {
        closeCart();
      }
    }

    const handleCheckout = (/*** @type {Event} */ e) => {
		e.preventDefault();
		if (user) {
			if (user.role === AppRole.ADMIN) {
				const message = 'Logged-in as admin. Cannot checkout';
				displayMessage({
					message,
					type: 'danger',
					header: message
				});
				return;
			}

      const headers = { Authorization: `Bearer ${user.token}` };

			const cartSnapshot = get(cart);
      const total = get(cartSubtotal);
			
			const payload = {
        amount: total,
				products: cartSnapshot.map(
					(/** @type {{ quantity: any; product: { id: any; }; }} */ item) => ({
						quantity: item.quantity,
						productId: item.product.id
					})
				)
			};

			(async () => {
				try {
					const orderValidationResult = await validateOrderBeforePayment(
						{ products: payload.products },
						headers
					);
					if (orderValidationResult?.length > 0) {
						const result = await orderCheckout(payload, headers);
						if (result?.success) {
							const origin = window.location.origin;
							const successUrl = `${origin}/payment-verification?orderId=${result.data.id}`;
							const paymentResult = await initiatePaystackPayment(
								{
									successUrl,
									amount: payload.amount,
									orderId: result.data.id,
									reference: result.data.paymentReference
								},
								headers
							);
							if (paymentResult?.success) {
								window.location.href = paymentResult.url;
							}
						}
					}
				} catch (ex) {
					if (ex instanceof AxiosError) {
						const axiosErrorObject = ex.response?.data;
						displayMessage({
							message: axiosErrorObject?.message,
							header: 'Error',
							type: 'danger'
						});
					}
				}
			})();
		} else {
			displayMessage({
				type: 'danger',
				header: 'Error',
				message: 'Please login to checkout'
			});
      closeCart();
      dispatch('openLogin');
		}
	};
  </script>
  
  <svelte:window on:keydown={handleKeydown} />
  
  <div class="fixed inset-0 z-50 transition-opacity duration-300 {$cartOpen ? 'block' : 'hidden'}">
    <button
      type="button"
      aria-label="Close cart backdrop"
      class="absolute inset-0 bg-ink/40 w-full h-full border-none cursor-default"
      on:click={closeCart}
    ></button>
  
    <div
      class="drawer absolute top-0 right-0 h-full w-[88%] max-w-[400px] bg-paper flex flex-col transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] {$cartOpen ? 'translate-x-0' : 'translate-x-full'}"
    >
      <div class="flex items-center justify-between h-[76px] px-6 border-b border-line">
        <h2 class="text-[15px] tracking-[0.04em]">
          Your Bag ({$cartCount})
        </h2>
        <button
          type="button"
          aria-label="Close bag"
          on:click={closeCart}
          class="w-8 h-8 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.3">
            <line x1="1" y1="1" x2="15" y2="15"/>
            <line x1="15" y1="1" x2="1" y2="15"/>
          </svg>
        </button>
      </div>
  
      {#if $cart.length > 0}
        <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
          {#each $cart as item, idx}
          {@const imageUrl = item.product.imagesForThisProduct[0].url}
          {@const productName = item.product.name}
            <div class="flex gap-4">
              <div class="w-20 h-24 bg-sand flex-shrink-0 overflow-hidden">
                <img src={imageUrl} 
                  alt={productName} 
                  class="w-full h-full object-cover" 
                />
              </div>
              <div class="flex-1 flex flex-col">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="text-[14px] leading-snug capitalize">
                    {productName}
                  </h3>
                  <button
                    type="button"
                    on:click={() => cart.removeItem(idx)}
                    class="text-[12px] text-charcoal/60 hover:text-ink flex-shrink-0"
                    aria-label="Remove {productName} from bag"
                  >
                    Remove
                  </button>
                </div>
                <p class="text-[13px] text-charcoal mt-1">{formatNaira(item.price)}</p>
                <div class="mt-auto flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    on:click={() => cart.updateQty(idx, -1)}
                    class="w-6 h-6 border border-line flex items-center justify-center text-[13px]"
                    aria-label="Decrease quantity of {productName}"
                  >
                    −
                  </button>
                  <span class="text-[13px] w-4 text-center" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    on:click={() => cart.updateQty(idx, 1)}
                    class="w-6 h-6 border border-line flex items-center justify-center text-[13px]"
                    aria-label="Increase quantity of {productName}"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
  
        <div class="border-t border-line px-6 py-6">
          <div class="flex items-center justify-between mb-5 text-[14px]">
            <span>Subtotal</span>
            <span>{formatNaira($cartSubtotal)}</span>
          </div>
          <button 
            type="button"
            on:click={handleCheckout}
            class="block w-full text-center bg-ink text-paper py-3.5 text-[13px] tracking-[0.08em] hover:bg-charcoal transition-colors"
          >
            Checkout
          </button>
        </div>
      {:else}
        <div class="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p class="text-[14px] text-charcoal mb-1">Your bag is empty.</p>
          <p class="text-[13px] text-charcoal/70">Add a fragrance to begin.</p>
        </div>
      {/if}
    </div>
  </div>