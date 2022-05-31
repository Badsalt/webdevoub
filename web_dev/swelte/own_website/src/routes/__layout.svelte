<script>
  import "../app.css";
  import { theme, THEMES } from "$lib/stores/theme";

  const toggleTheme = () => {
    $theme = $theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  };
</script>

<main>
  <div class="h-screen drawer w-full">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              /></svg
            >
          </label>
        </div>

        <div class="flex-1 px-2 mx-2">
          <!-- Navbar left item -->
          📜
          <div class="inline-block">
            <div class="form-control">
              <label class="cursor-pointer label">
                <input
                  type="checkbox"
                  class="toggle toggle-primary"
                  checked={$theme !== THEMES.DARK}
                  on:change={toggleTheme}
                />
              </label>
            </div>
          </div>
          🧁
        </div>

        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <li><a href="/">Hem</a></li>
            <li><a href="/annat">Annat</a></li>
            <li><a href="/lab_members">Lab Members</a></li>
            <li><a href="/search">Sök</a></li>
          </ul>
        </div>
      </div>
      <!-- Page content here -->

      <slot />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay" />
      <ul class="p-4 overflow-y-auto menu w-80 bg-base-100">
        <!-- Sidebar content here -->
        <li><a href="/">Hem</a></li>
        <li><a href="/annat">Annat</a></li>
        <li><a href="/lab_members">Lab Members</a></li>
        <li><a href="/search">Sök</a></li>
      </ul>
    </div>
  </div>
</main>

<footer
  class="px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300"
>
  <div>
    <img src="majalogo.png" class="max-w-sm rounded-lg shadow-2xl" />
  </div>
</footer>

<style>
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
