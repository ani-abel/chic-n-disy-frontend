<script>
    import { createEventDispatcher } from 'svelte';
  
    /**
     * @typedef {Object} PaginationMeta
     * @property {number} totalPages
     * @property {number} currentPage
     * @property {number} pageSize
     * @property {boolean} hasNext
     * @property {boolean} hasPrevious
     * @property {number} totalCount
     */
  
    /** @type {PaginationMeta} */
    export let meta;
  
    /** @type {string} [ariaLabel='Category results pages'] */
    export let ariaLabel = 'Category results pages';
  
    const dispatch = createEventDispatcher();
  
    /**
     * @param {number} page
     */
    function goToPage(page) {
      if (meta && page >= 1 && page <= meta.totalPages && page !== meta.currentPage) {
        dispatch('change', page);
      }
    }
  
    // Reactive calculation for page numbers with ellipsis support
    /** @type {number[]} */
    $: pageNumbers = (() => {
      if (!meta || meta.totalPages <= 1) return [];
  
      const total = meta.totalPages;
      const current = meta.currentPage;
      const delta = 1;
  
      /** @type {number[]} */
      const pages = [];
      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
          pages.push(i);
        }
      }
      return pages;
    })();
  </script>
  
  {#if meta && meta.totalPages > 1}
    <nav aria-label={ariaLabel} class="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32">
      <div class="flex items-center justify-between sm:justify-center gap-2 sm:gap-3 border-t border-line pt-8">
        
        <!-- Previous Button -->
        <button 
          type="button"
          on:click={() => goToPage(meta.currentPage - 1)}
          disabled={!meta.hasPrevious || meta.currentPage === 1}
          aria-label="Previous page" 
          class="flex items-center gap-2 text-[13px] tracking-[0.04em] text-charcoal hover:text-ink disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <span aria-hidden="true">←</span><span class="hidden sm:inline">Previous</span>
        </button>
  
        <!-- Mobile: compact page indicator -->
        <span class="sm:hidden text-[13px] tracking-[0.04em] text-charcoal">
          {meta.currentPage} / {meta.totalPages}
        </span>
  
        <!-- Desktop: numbered pages -->
        <div class="hidden sm:flex items-center gap-1">
          {#each pageNumbers as page, idx (page)}
            {#if idx > 0 && page - pageNumbers[idx - 1] > 1}
              <span class="w-8 h-8 flex items-center justify-center text-[13px] text-charcoal/50" aria-hidden="true">…</span>
            {/if}
            <button 
              type="button"
              on:click={() => goToPage(page)}
              aria-label={`Go to page ${page}`} 
              aria-current={page === meta.currentPage ? 'page' : undefined} 
              class={`w-8 h-8 flex items-center justify-center text-[13px] transition-colors cursor-pointer ${
                page === meta.currentPage 
                  ? 'bg-ink text-paper font-medium' 
                  : 'text-charcoal hover:text-ink'
              }`}
            >
              {page}
            </button>
          {/each}
        </div>
  
        <!-- Next Button -->
        <button 
          type="button"
          on:click={() => goToPage(meta.currentPage + 1)}
          disabled={!meta.hasNext || meta.currentPage === meta.totalPages}
          aria-label="Next page" 
          class="flex items-center gap-2 text-[13px] tracking-[0.04em] text-charcoal hover:text-ink disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <span class="hidden sm:inline">Next</span><span aria-hidden="true">→</span>
        </button>
      </div>
    </nav>
  {/if}