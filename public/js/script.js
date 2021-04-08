$(document).ready(() =>
{
    $("#results-box").hide();
    $("#saved-box").hide();

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
        $(this).parents()[1].remove();
    }

    function select(e)
    {
        e.preventDefault();
        //Get fields.
        const name = $(this).data("name");
        const brand = $(this).data("brand");
        const cal = $(this).data("cal");
        const pro = $(this).data("pro");
        const carb = $(this).data("carb");
        const fat = $(this).data("fat");

        console.log(`${name} ${brand} ${cal} ${pro} ${carb} ${fat}`);
        //Hide the results box.
        $("#results-box").hide();
        //Clear text box.
        $("#foods-input").val("");
        //Add food to saved items box.
        let card = $(`<div class="meal-card">
                <img class="meal-card-img"
                    src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8YmFuYW5hc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60">
                <div class="meal-card-text-layout">
                    <h3>${name}</h3>
                    <p>${brand}</p>
                    <div class="flex-row" style="gap:20px; margin-top: 20px;">
                        <p class="regular foreground-success">Calories: ${cal}</p>
                        <p class="regular foreground-danger">Proteins: ${pro}g</p>
                        <p class="regular foreground-warning">Carbs: ${carb}g</p>
                        <p class="regular foreground-success">Fats: ${fat}g</p>
                    </div>
                </div>
                <div class="flex-row"
                    style="margin-right:16px; margin-left:auto; margin-top: 16px; margin-bottom: auto;">
                    <button type="submit" class="btn outline trash-button" style="margin: 12 0 20 0;" data-name="${name}" data-brand="${brand}" data-cal="${cal}" data-pro="${pro}" data-carb="${carb}" data-fat="${fat}"><i
                            class="fas fa-trash-alt" style="padding-right:8px;"></i>Trash</button>
                </div>
            </div>`);
        $("#saved-container").append(card);
        $(".trash-button").click(trash);
        //Show saved items box.
        $("#saved-box").show();
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
                    $("#results-container").empty();
                    //put results in cards.
                    response.hits.forEach(el => {
                        let card = $(`<div class="meal-card">
                <img class="meal-card-img"
                    src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8YmFuYW5hc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60">
                <div class="meal-card-text-layout">
                    <h3>${el.fields.item_name}</h3>
                    <p>${el.fields.brand_name}</p>
                    <div class="flex-row" style="gap:20px; margin-top: 20px;">
                        <p class="regular foreground-success">Calories: ${el.fields.nf_calories}</p>
                        <p class="regular foreground-danger">Proteins: ${el.fields.nf_protein}g</p>
                        <p class="regular foreground-warning">Carbs: ${el.fields.nf_total_carbohydrate}g</p>
                        <p class="regular foreground-success">Fats: ${el.fields.nf_total_fat}g</p>
                    </div>
                </div>
                <div class="flex-row"
                    style="margin-right:16px; margin-left:auto; margin-top: 16px; margin-bottom: auto;">
                    <button type="submit" class="btn outline select-button" style="margin: 12 0 20 0;" data-name="${el.fields.item_name}" data-brand="${el.fields.brand_name}" data-cal="${el.fields.nf_calories}" data-pro="${el.fields.nf_protein}" data-carb="${el.fields.nf_total_carbohydrate}" data-fat="${el.fields.nf_total_fat}"><i
                            class="fas fa-plus" style="padding-right:8px;"></i>Select</button>
                </div>
            </div>`);
                        $("#results-container").append(card);
                    });
                    $(".select-button").click(select);
                    $("#results-box").show();
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