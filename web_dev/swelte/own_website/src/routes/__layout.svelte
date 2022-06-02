<script>
  import "../app.css";
  import { theme, THEMES } from "$lib/stores/theme";


</script>

<main>
  <div class="h-screen drawer w-full">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content">
      <!-- Navbar -->
      <div class="navbar bg-base-300">
        <div class="navbar-start">
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
          </div>

        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0">
            <!-- Navbar menu content here -->
  
            <div class="dropdown dropdown-hover">
              <li><label on:click={() => {  window.open("./", "_self"); }} tabindex="0"  class="btn btn-ghost normal-case text-xl">Research Overview</label></li>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                <li><a href="#" >Current projects</a></li>
                <li><a href="#">Projects</a></li>
              </ul>
            </div>
            <!-- <li><a class="btn btn-ghost normal-case text-xl" href="./">Research Overview</a></li> -->

            <div class="dropdown dropdown-hover">
              <li><label on:click={() => {  window.open("./lab_members", "_self"); }} tabindex="0"  class="btn btn-ghost normal-case text-xl">Lab Members</label></li>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                <li><a href="./lab_members#2" >Former Members</a></li>
                <li><a href="./lab_members#3">Students and Visiting PostDocs</a></li>
              </ul>
            </div>
            <li><a  class="btn btn-ghost normal-case text-xl" href="./publications">Publications</a></li>
            <li><a class="btn btn-ghost normal-case text-xl" href="/news">News</a></li>
            <li><a class="btn btn-ghost normal-case text-xl" href="/contact">Contact</a></li>
            <li><a class="btn btn-ghost normal-case text-xl" href="#">Media</a></li>
          </ul>
        </div>
        <div class="navbar-end">

        </div>
      </div>
       
      <slot />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay" />
      <ul class="p-4 overflow-y-auto menu w-80 bg-base-100">
        <!-- Sidebar content here -->
        <div class="dropdown dropdown-hover">
          <li><label on:click={() => {  window.open("./", "_self"); }} tabindex="0"  class="btn btn-ghost normal-case text-xl">Research Overview</label></li>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
            <li><a href="#" >Current projects</a></li>
            <li><a href="#">Finnised Projects</a></li>
          </ul>
        </div>
        <!-- <li><a class="btn btn-ghost normal-case text-xl" href="./">Research Overview</a></li> -->

        <div class="dropdown dropdown-hover">
          <li><label on:click={() => {  window.open("./lab_members", "_self"); }} tabindex="0"  class="btn btn-ghost normal-case text-xl">Lab Members</label></li>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
            <li><a href="./lab_members#2" >Former Members</a></li>
            <li><a href="./lab_members#3">Students and Visiting PostDocs</a></li>
          </ul>
        </div>
        <li><a  class="btn btn-ghost normal-case text-xl" href="./publications">Publications</a></li>
        <li><a class="btn btn-ghost normal-case text-xl" href="/news">News</a></li>
        <li><a class="btn btn-ghost normal-case text-xl" href="/contact">Contact</a></li>
        <li><a class="btn btn-ghost normal-case text-xl" href="#">Media</a></li>
      </ul>
    </div>
  </div>
</main>

<footer
  class="px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300"
>
  <div>
   <span>DEGERMAN LAB</span>
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
