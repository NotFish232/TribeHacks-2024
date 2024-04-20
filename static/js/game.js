$(function () {
    let json = $("#data_store").data("json");

    let question_element = $("#question");
    let card_elements = $("[id^=card_]");
    let hammers_element = $("#hammers");
    let lives_element = $("#lives");
    let crab_element = $("#crab");
    let streak_element = $("#streak")[0];

    let streak = 0;

    let question_set;
    let question;
    let answer;

    let hammers = [];

    let max_lives = 3;
    let num_lives = max_lives;

    function are_colliding(el1, el2) {
        var rect1 = el1[0].getBoundingClientRect();
        var rect2 = el2[0].getBoundingClientRect();

        return !(
            rect1.top > rect2.bottom - 100 ||
            rect1.right < rect2.left ||
            rect1.bottom < rect2.top + 100 ||
            rect1.left > rect2.right
        );
    }

    function set_next_question_set() {
        let keys = Object.keys(json);

        let random_keys = [];

        while (random_keys.length != 4) {
            let random_key = keys[(keys.length * Math.random()) << 0];
            if (!random_keys.includes(random_key)) {
                random_keys.push(random_key);
            }
        }

        question_set = random_keys;
        question = question_set[0];
        answer = json[question];
        question_set = question_set
            .map((x) => ({ x, key: Math.random() }))
            .sort((a, b) => a.key - b.key)
            .map(({ x }) => x);

        for (let i = 0; i < 4; ++i) {
            card_elements[i].innerHTML = json[question_set[i]];
        }
        question_element[0].innerHTML = `Which definition matches the term "${question}" ?`;
    }

    function create_new_hammer() {
        let hammer_element = $(
            `<div class="left-[50%] top-[20%] absolute h-96 w-96"><img src="/static/assets/hammer.png"></div>`,
        );

        let x = 350;
        let y = 0;
        let rotation = 180;

        hammer_element.css("transform", `translate(${x}px, ${y}px)`);

        hammers.push([hammer_element, x, y, rotation]);
        hammers_element.append(hammer_element);
    }

    function update_hammer_locations() {
        for (let i = 0; i < hammers.length; ++i) {
            let [hammer_element, x, y, rotation] = hammers[i];
            hammer_element.css("transform", `translate(${x}px, ${y}px) rotate(${rotation}deg)`);

            hammers[i][2] += 2;
            hammers[i][3] -= 0.5;
        }
    }

    function show_correct_answer() {
        let full_card_elements = $("[id^=full_card_]");
        for (let i = 0; i < 4; ++i) {
            if (question == question_set[i]) {
                $(full_card_elements.get(i)).addClass("border-green-800");
            } else {
                $(full_card_elements.get(i)).addClass("border-red-800");
            }
        }

        setTimeout((_) => {
            create_new_hammer();
            set_next_question_set();

            full_card_elements.removeClass("border-green-800");
            full_card_elements.removeClass("border-red-800");
        }, 1000);
    }

    function update_displayed_lives() {
        lives_element.find("div").remove();
        for (let i = 0; i < max_lives; ++i) {
            if (i < num_lives) {
                lives_element.append(
                    $(
                        `<div class="h-20 w-20"><img src="/static/assets/heart.png" /></div>`,
                    ),
                );
            } else {
                lives_element.append(
                    $(
                        `<div class="h-20 w-20"><img src="/static/assets/heart_empty.png" /></div>`,
                    ),
                );
            }
        }
    }

    function handle_game_over() {
        crab_element.find("img")[0].src = "/static/assets/explosion.png";
    }

    $("[id^=full_card_]").on("click", function (e) {
        let idx = parseInt($(this).attr("id").slice(-1)) - 1;

        hammers[0][0].remove();
        hammers = [];

        if (question == question_set[idx]) {
            streak += 1;
        } else {
            num_lives -= 1;
            if (num_lives == 0) {
                handle_game_over();
            }
            streak = 0;
        }

        show_correct_answer();

        streak_element.innerHTML = `Streak: ${streak}`;
    });

    function game_loop() {
        update_hammer_locations();

        for (let [hammer, _x, _y, _r] of hammers) {
            if (are_colliding(crab_element, hammer)) {
                hammers[0][0].remove();
                hammers = [];
                num_lives -= 1;
                if (num_lives == 0) {
                    handle_game_over();
                }
                create_new_hammer();
                set_next_question_set();

                streak = 0;
                streak_element.innerHTML = `Streak: ${streak}`;
            }
        }

        update_displayed_lives();
    }

    create_new_hammer();

    set_next_question_set();

    let game_interval = setInterval(game_loop, 50);
});
