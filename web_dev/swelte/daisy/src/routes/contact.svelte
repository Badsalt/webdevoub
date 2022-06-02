<svelte:head>
	<title>Contact</title>
</svelte:head>


<script>
    import { fly, fade, slide, draw } from "svelte/transition";
</script>

<main>

    <div class="container">
        
        <div class="flex text-left justify-self-center items-center space-x-6 flex-col-reverse sm:flex-row ">

            <div in:fade class="flex-initial w-6/12">

                <span><b>Lab Address:</b></span>
                <div class="flex flex-col">
                    <span>Department of Medical Biosciences </span>
                    <span>Umeå University</span>

                    <span>901 85 Umeå, Sweden</span>
                    <span>NUS, TRC, M21, 2nd floor</span>
                    <span>Sweden</span>
                    <span class="mt-4"><b>Lab Email Address:</b></span>
                    <span><a href="mailto:sofie.degerman@umu.se">sofie.degerman@umu.se</a></span>

                    <h2  class="mt-6 font-bold">Other sites:</h2>
                    <ul>
                        <li>Umeå University web site: <a class="underline decoration-blue" href="https://www.umu.se/en/staff/sofie-degerman/" target="_blank">https://www.umu.se/en/staff/sofie-degerman/ </a></li>
                        <li>Linkedin: <a class="underline decoration-blue"  href="https://www.linkedin.com/in/sofie-degerman-06038876/" target="_blank">https://www.linkedin.com/in/sofie-degerman-06038876/ </a></li>
                        <li>Researchgate:  <a class="underline decoration-blue" href="https://www.researchgate.net/profile/Sofie-Degerman" target="_blank">https://www.researchgate.net/profile/Sofie-Degerman</a></li>
                    </ul>
                </div>
            </div>

            <div in:fade  class="flex-1">
                <iframe class="test rounded-lg w-full sm:6/12" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1760.350527718642!2d20.300694000000007!3d63.81884600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9b932cafb8c2a1e3!2zNjPCsDQ5JzA3LjkiTiAyMMKwMTgnMDIuNSJF!5e0!3m2!1ssv!2sse!4v1654017975452!5m2!1ssv!2sse" width="100%" height="400" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </div>

       
    </div>

</main>


<style>
 main {
        width: 100%;
        border: 0;
        margin: 0;
        padding-bottom: 75px;
        overflow-y: scroll;
    }

    .container {
        width: 75%;
        margin-top: 20px;
        /* margin: 20px auto; */
    }

    .test { 
        box-shadow: 2px 2px 2px grey;
    }
    @media screen and (max-width: 1035px){
        .container {
            width: 90%;
        }
    }
</style>
