
window.addEventListener('DOMContentLoaded', function () {

    const fileInput = document.querySelector('#id_photo');
    const canvas = document.querySelector('#imageCanvas');
    const submitBtn = document.querySelector('#submitBtn');
    let ctx = canvas.getContext('2d');

    function handleImage() {
        let fileList = fileInput.files;
        let reader = new FileReader();

        reader.readAsDataURL(fileList[0]);

        submitBtn.disabled = false;

        reader.onload = (event) => {
            let img = new Image();
            img.onload = () => {
                canvas.width = 100;
                canvas.height = 100;
                ctx.drawImage(img, 0, 0, 100, 100);

                submitBtn.parentNode.style.display = "block";
            }

            img.src = event.target.result;
        }
    }

    fileInput.addEventListener('change', handleImage);

}) 