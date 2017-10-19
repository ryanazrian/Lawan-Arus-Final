var TextValidator = (function () {
    function TextValidator() {
    }
    TextValidator.checkUsername = function (control) {
        return new Promise(function (resolve) {
            //Fake a slow response from server
            setTimeout(function () {
                if (control.value.toLowerCase() === "greg") {
                    resolve({
                        "text taken": true
                    });
                }
                else {
                    resolve(null);
                }
            }, 2000);
        });
    };
    return TextValidator;
}());
export { TextValidator };
//# sourceMappingURL=text.js.map