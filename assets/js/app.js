var app = {
    init: function () {
        if (!sessionStorage.getItem('login')) {
            location.href = 'login.html';
        }
    },
    text2img: function () {
        var endpoint = 'https://stablediffusionapi.com/api/v3/text2img';

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            "key": "Ddoxn9JT0nOj6FQshX3LJosr8WrSbc01RepSubAp3Eu0JwP0aw72pX0jdqIP",
            "prompt": "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner))",
            "negative_prompt": null,
            "width": "512",
            "height": "512",
            "samples": "1",
            "num_inference_steps": "20",
            "seed": null,
            "guidance_scale": 7.5,
            "safety_checker": "yes",
            "multi_lingual": "yes",
            "panorama": "no",
            "self_attention": "no",
            "upscale": "no",
            "embeddings_model": null,
            "webhook": null,
            "track_id": null
        };

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $.ajax({
            url: endpoint,
            method: 'POST',
            data: raw,
            success: function (response) {
                console.log(response);
            },
            error: function (a, b, c) {
                console.log(a, b, c);
            }
        });
        // fetch(endpoint, requestOptions)
        //     .then(response => response.json())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }

}
$(function () {
    app.init();
})