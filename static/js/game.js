$(function () {
    let json = $("#data_store").data("json");
    let hammers_element = $("#hammers");
    let lives_element = $("#lives");

    let hammers = [];

    let max_lives = 3;
    let num_lives = max_lives;

    function create_new_hammer() {
        let hammer_element = $(
            `<div class="left-[50%] top-[20%] absolute h-20 w-20"><img src="/static/assets/hammer.png"></div>`,
        );
    
        let x = (Math.random() - 0.5 ) * 500;
        let y = 0;

        hammers.push([hammer_element, x, y]);
        hammers_element.append(hammer_element);

    }

    function update_hammer_locations() {
        for (let i = 0; i < hammers.length; ++i) {
            let [hammer_element, x, y] = hammers[i];
            hammer_element.css("transform", `translate(${x}px, ${y}px)`);

            hammers[i][2] += 5;
        }
    }

    function update_displayed_lives() {
        lives_element.find("div").remove();
        for (let i = 0; i < num_lives; ++i) {
            lives_element.append(
                $(
                    `<div class="h-20 w-20"><img src="/static/assets/heart.png" /></div>`,
                ),
            );
        }
    }

    function game_loop() {
        update_hammer_locations();
    }

    update_displayed_lives();

    create_new_hammer();
    

    let game_interval = setInterval(game_loop, 50);
});
