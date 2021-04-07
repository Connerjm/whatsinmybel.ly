$(document).ready(() =>
{
    /* Button handlers. */

    /* Nav buttons. */

    $("#sign-in").click(() =>
    {
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

        const email = $("#email-input").val().trim();
        const password = $("#password-input").val().trim();

        if (email && password)
        {
            $.ajax({
                url: "/api/user-routes/sign-in",
                type: "POST",
                data: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
                success: () => { document.location.replace("/dashboard") },
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
                success: () => { document.location.replace("/dashboard") },
                error: (req, text, err) =>
                {
                    alert(`Something went wrong! Status: ${text}; Error: ${err}`);
                }
            });
        }
    });

    /* Add meals page. */

    $("#add-meal-button").click(() =>
    {
        document.location.replace("/addmeal");
    });

    /* Meal page. */

    $("#delete-meal").click(() =>
    {
        //Remove meal from db.
    });

    /* Add meal page. */

    $("#go-back-button").click(() =>
    {
        document.location.replace("/dashboard");
    });

    function trash(e)
    {
        e.preventDefault();
        $(this).parents()[0].remove();
    }

    function select(e)
    {
        e.preventDefault();
        //Get fields.
        const id = $(this).data("id");
        const name = $(this).data("name");
        const brand = $(this).data("brand");
        const cal = $(this).data("cal");
        const pro = $(this).data("pro");
        const carb = $(this).data("carbs");
        const fat = $(this).data("fats");

        console.log(`${id} ${name} ${brand} ${cal} ${pro} ${carb} ${fat}`);
        //Hide the results box.
        $("#results-box").css("display", "none");
        //Clear text box.
        $("#foods-input").val("");
        //Add food to saved items box.
        let card = $(`<div></div>`);
        card.append($(`<h3>${name}</h3>`));
        card.append($(`<p>Brand: ${brand}</p>`));
        card.append($(`<p>Calories: ${cal}</p>`));
        card.append($(`<p>Protein: ${pro}</p>`));
        card.append($(`<p>Carbs: ${carb}</p>`));
        card.append($(`<p>Fats: ${fat}</p>`));
        let button = $(`<button class="trash-button">Trash</button>`);
        $(button).click(trash);
        card.append(button);
        $("#saved-container").append(card);
        //Show saved items box.
        $("#items-box").css("display", "block");
    };

    $("#search-button").click((e) =>
    {
        e.preventDefault();

        //Get search term.
        const search = $("#foods-input").val().trim();
        
        //search nutritionx api.
        if (search)
        {
            $.ajax({
                url: `https://nutritionix-api.p.rapidapi.com/v1_1/search/${search}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate`,
                type: "GET",
                headers: {
                    "x-rapidapi-key": "48c11b17afmsh79f4383215dc494p1e1db3jsn936de6f29bd0",
                    "x-rapidapi-host": "nutritionix-api.p.rapidapi.com"
                },
                success: response => {
                    console.log(response.hits);
                    $("#results-container").empty();
                    //put results in cards.
                    response.hits.forEach(el => {
                        let card = $(`<div></div`);
                        card.append($(`<h3>${el.fields.item_name}</h3>`));
                        card.append($(`<p>Brand: ${el.fields.brand_name}</p>`));
                        card.append($(`<p>Calories: ${el.fields.nf_calories}</p>`));
                        card.append($(`<p>Protein: ${el.fields.nf_protein}</p>`));
                        card.append($(`<p>Carbs: ${el.fields.nf_total_carbohydrate}</p>`));
                        card.append($(`<p>Fats: ${el.fields.nf_total_fat}</p>`));
                        let button = ($(`<button class="select-button" data-id="${el.fields.item_id}" data-name="${el.fields.item_name}" data-brand="${el.fields.brand_name}" data-cal="${el.fields.nf_calories}" data-pro="${el.fields.nf_protein}" data-carbs="${el.fields.nf_total_carbohydrate}" data-fats="${el.fields
                        .nf_total_fat}">Select</button>`));
                        $(button).click(select);
                        card.append(button);
                        $("#results-container").append(card);
                    });
                    $("#results-box").css("display", "block");
                },
                error: (req, text, err) =>
                {
                    alert(`Something went wrong! Status: ${text}; Error: ${err}`);
                }
            });
        }
    });

    $("#cancel-button").click((e) =>
    {
        e.preventDefault();
        document.location.replace("/dashboard");
    });

    $("#save-button").click((e) =>
    {
        e.preventDefault();
        //Save foods to db.
        //redirect to dashboard.
    });
});