$(document).ready(() =>
{
    /* Button handlers. */

    /* Nav buttons. */

    $("#sign-in").click(() =>
    {
        //Simply redirect.
        document.location.replace("/signin");
    });

    $("#sign-up").click(() =>
    {
        document.location.replace("/signup");
    });

    $("#dashboard").click(() =>
    {
        document.location.replace("/dashboard");
    });

    $("#logout").click(() =>
    {
        //Don't need any info, just logout and redirect to the signin page afterwards.
        $.ajax({
            url: "/api/user-routes/logout",
            type: "POST",
            headers: {"Content-Type" : "application/json" },
            success: () => { document.location.replace("/signin") },
            error: (req, text, err) =>
            {
                alert(`Something went wrong! Status: ${text}; Error: ${err}`);
            }
        });
    });

    /* Sign in or Sign up pages. */

    $("#sign-in-button").click((e) =>
    {
        e.preventDefault();

        //Get fields from form
        const email = $("#email-input").val().trim();
        const password = $("#password-input").val().trim();

        //If both are there.
        if (email && password)
        {
            $.ajax({
                url: "/api/user-routes/sign-in",
                type: "POST",
                data: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
                success: () => { document.location.replace("/") },
                error: (req, text, err) =>
                {
                    alert(`Something went wrong! Status: ${text}; Error: ${err}`);
                }
            });
        }
    });

    $("#sign-up-button").click((e) =>
    {
        e.preventDefault();

        const username = $("#username-input").val().trim();
        const email = $("#email-input").val().trim();
        const password = $("#password-input").val().trim();

        if (username && email && password)
        {
            $.ajax({
                url: "/api/user-routes/",
                type: "POST",
                data: JSON.stringify({ username, email, password }),
                headers: { "Content-Type": "application/json" },
                success: () => { document.location.replace("/") },
                error: (req, text, err) =>
                {
                    alert(`Something went wrong! Status: ${text}; Error: ${err}`);
                }
            });
        }
    });

    /* All meals page. */

    $("#add-meal-button").click(() =>
    {

    });

    /* Meal page. */

    $("#edit-meal").click(() =>
    {

    });

    $("#delete-meal").click(() =>
    {

    });

    /* Dash header. */

    $("#date-left").click(() =>
    {

    });

    $("#date-right").click(() =>
    {

    });

    /* Add meal page. */

    $("#go-back-button").click(() =>
    {

    });

    $("#cancel-button").click(() =>
    {

    });

    $("#save-button").click(() =>
    {

    });
});