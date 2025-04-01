<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    console.log(data);
</script>

<h2>providers</h2>

<a href="/providers/server">install providers from the server</a>

<ul>
    {#each data.providers as provider}
        <li><a href="/providers/id/{provider.id}">{provider.name}</a></li>
    {/each}
</ul>
