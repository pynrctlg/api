var app = {
    init: function () {
        if (!sessionStorage.getItem('login')) {
            location.href = 'login.html';
        }
        $('body').on('submit', '#frmTxt2Img', function () {
            var prompt = $(this).find('[name="prompt"]').val();
            var n_prompt = $(this).find('[name="n_prompt"]').val();
            app.text2img(prompt, n_prompt);
        })
    },
    text2img: function (prompt, n_prompt) {
        $('#resultContent').addClass('hide');

        var endpoint = 'https://stablediffusionapi.com/api/v3/text2img';

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = {
            "key": "Ddoxn9JT0nOj6FQshX3LJosr8WrSbc01RepSubAp3Eu0JwP0aw72pX0jdqIP",
            "prompt": prompt,
            "negative_prompt": n_prompt,
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

        loading(true);

        $.ajax({
            url: endpoint,
            method: 'POST',
            data: raw,
            success: function (response) {
                console.log(response);
                $('#resultContent img').attr('src', response.output[0]);
                $('#resultContent').removeClass('hide');
            },
            error: function (a, b, c) {
                console.log(a, b, c);
            },
            complete: function () {
                loading(false);
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