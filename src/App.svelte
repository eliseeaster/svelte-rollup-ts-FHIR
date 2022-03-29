<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Index from "./Index.svelte";
  import Launch from "./Launch.svelte";
  export let url: string = "";
</script>

<Router {url}>
  <Route path="/">
    <Launch />
  </Route>
  <Route path="/app">
    <Index />
  </Route>
</Router>
