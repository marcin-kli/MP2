function sendMail(contactForm) {
    emailjs.send("service_kx64dd9","template_EARTHQUAKES", {   
        'from_name': contactForm.name.value,
        'from_email': contactForm.emailaddress.value,
        'request': contactForm.comments.value
    })
    .then(
        function (response) {
            "SUCCESS", response;
            alert("Email sent successfully! " + response.text);
        },
        function (error) {
            "FAILED", error;
            alert("FAILED! " + error.text);
        }
    );
    return false;
}