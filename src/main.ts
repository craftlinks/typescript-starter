
const checkWebGPUSupport = navigator.gpu ? 'Great, your current browser supports WebGPU!' :
    `Your current browser does not support WebGPU! Make sure you are on a system 
    with WebGPU enabled.`;


const getGPUInfo = async () => {
    const div = document.querySelector('#id-result') as HTMLDivElement;
    try {
        if (!navigator.gpu) {
            div.style.lineHeight = "150%";
            div.innerHTML = checkWebGPUSupport;
            throw new Error(checkWebGPUSupport);
        }
        let ss = `<p>${checkWebGPUSupport}</p>`;
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) return;
        const info = await adapter.requestAdapterInfo();

        ss += `<br/><h3>Adapter Info:</h3>
               <p>Vendor: ${info.vendor}</p>
               <p>Architecture: ${info.architecture}</p>`;

        ss += `<br/><h3>GPU Supported Limits:</h3>`;
        let i: keyof GPUSupportedLimits;
        for (i in adapter.limits) {
            ss += `<p>${i}: ${adapter.limits[i]}</p>`;
        }

        ss += `<br/><h3>GPU Supported Features:</h3>`;
        adapter.features.forEach((x) => {
            ss += `<p>${x}</p>`
        });

        div.innerHTML = ss;

    } catch (error: any) {
        throw new Error(error);
    }
}
getGPUInfo();
