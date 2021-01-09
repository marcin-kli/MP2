// source idea: https://courses.codeinstitute.net/courses/course-v1:CodeInstitute+IFD101+2017_T3/courseware/03d3f6524ad249d9b33e3336d156dfd0/e4710f80cdf34bffbd607bc102482d5c/?activate_block_id=block-v1%3ACodeInstitute%2BIFD101%2B2017_T3%2Btype%40sequential%2Bblock%40e4710f80cdf34bffbd607bc102482d5c
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