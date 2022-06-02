<svelte:head>
	<title>Research Overview</title>
</svelte:head>

<script>
    import { fly, fade, slide, draw } from "svelte/transition";
</script>

<div class="container">

    <div class="w-full mb-6 h-auto bg-base border test border-slate-500 rounded-">
        <div class="flex flex-row mx-20 self-center">
            <div class="basis-1/4 self-center"><img class="aspect-[4/3] h-40" src="/pic/icon.PNG" alt="Icon"></div>
            <div class="basis-3/4 h-auto text-left self-center">
                <h1 class="font-bold text-4xl tracking-wider ">DEGERMAN LAB</h1>
                <h3 class="text-3xl tracking-wide italic r">-Epigenetics and telomere biology</h3>
            </div>
        </div>
    </div>    
    <!-- "{{delay: 250, duration: 300, easing: quintOut }}" -->


    <div class="flex flex-col items-center lg:flex-row">
        <div in:fade="{{ duration: 1000, delay: 200 }}" class="basis-1/2">
            <!-- [4/3] -->
            <div class="avatar w-full aspect-[4/3] rounded-lg border-4 border-black">
                <img src="/pic/gruppbild.JPG" alt="Group Picture Lab Members">
              </div>
        </div>
        <div in:fade="{{ duration: 1000, delay: 200 }}" class="basis-1/2">
            <div class="text-left w-11/12  mx-auto my-auto lg:ml-6 lg:w-9/12 text-lg">
                <p class="my-6">Sofie Degerman’s research team holds expertise in the fields of epigenetics, telomere biology, and hematopathology, and aims to improve diagnostics, risk stratification, and treatment of hematological malignancies with a special focus on T-cell acute lymphoblastic leukemia (T-ALL). The research is carried out in the Translational Research Centre at Umeå University, which is an excellent translational research environment equipped with modern molecular biology technologies.
                </p>
                <h1 class="font-bold text-lg my-6">Sofie Degerman’s research is currently granted by:</h1>
                <div class="grid grid-cols-3 gap-2">
                    <a href="https://www.barncancerfonden.se/en/" target="_blank"><img  src="/pic/founders/Barncancer_fonden.jpg" alt="Barncancer Fonden"></a>
                    <a href="https://www.cancerfonden.se/" target="_blank"><img src="/pic/founders/Cancerfonden.jpg" alt="Cancerfonden"></a>
                    <a href="https://cancerforskningsfonden.se/" target="_blank"><img src="/pic/founders/Cancerforskningsfonden_i_Norrland.jpg" alt="Cancerforskningsfonden_i_Norrland"></a>
                    <a href="https://www.kempe.com/" target="_blank"><img src="/pic/founders/Kempestiftelserna.jpg" alt=""></a>
                    <a href="https://stodforskning.umu.se/" target="_blank"><img src="/pic/founders/Medicinsk_forskning.jpg" alt=""></a>
                    <a href="https://www.regionvasterbotten.se/" target="_blank"><img src="/pic/founders/Region_Västerbotten.jpg" alt=""></a>
                    <a href="https://www.umu.se/en/" target="_blank"><img src="/pic/founders/Umeå_University.jpg" alt=""></a>
                </div>      
            </div>
        </div>
        
    </div>
</div>

<style>
    .container {
        margin-top: 20px;
        margin-bottom: 100px;
        text-align: center;
    }
    .avatar {
        margin: 0 auto;
    }

    .test {
        border-radius: 100px / 50px;
        box-shadow: 2px 2px 2px 2px grey;
    }

    .grid img {
        margin: auto;
        border-color: black;
    }

</style>