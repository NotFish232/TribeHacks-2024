$(function () {
    let json = $("#data_store").data("json");

    let question_element = $("#question");
    let card_elements = $("[id^=card_]");
    let hammers_element = $("#hammers");
    let lives_element = $("#lives");
    let crab_element = $("#crab");

    let bonk_audio = new Audio("/static/assets/bonk.mp3");
    bonk_audio.playbackRate = 0.6;

    let num_correct = 0;

    let question_set;
    let question;
    let answer;
    let wrong_questions = [];

    let hammers = [];

    let max_lives = 3;
    let num_lives = max_lives;

    function are_colliding(el1, el2) {
        var rect1 = el1[0].getBoundingClientRect();
        var rect2 = el2[0].getBoundingClientRect();

        return !(
            rect1.top > rect2.bottom - 200 ||
            rect1.right < rect2.left ||
            rect1.bottom < rect2.top + 200 ||
            rect1.left > rect2.right
        );
    }

    function set_next_question_set() {
        let keys = Object.keys(json);

        let random_keys = [];

        if (Object.keys(json).length < 4) {
            return;
        }

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

            hammers[i][2] += 1;
            hammers[i][3] -= 0.2;
        }
    }

    function show_correct_answer() {
        let full_card_elements = $("[id^=full_card_]");
        for (let i = 0; i < 4; ++i) {
            if (question == question_set[i]) {
                $(full_card_elements.get(i)).addClass("!border-green-800");
            } else {
                $(full_card_elements.get(i)).addClass("!border-red-800");
            }
        }

        setTimeout((_) => {
            create_new_hammer();
            set_next_question_set();

            full_card_elements.removeClass("!border-green-800");
            full_card_elements.removeClass("!border-red-800");
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

        Swal.fire({
            title: "Game Over",
            html: `
            <div class="flex flex-col items-center">
            <div>
            <img src="/static/assets/crab_puddle.png">
            <div>
            <div class="mb-4">
                You answer ${num_correct} terms correctly
            </div>
            <div class="mb-2">
                Keep reviewing the following terms:
            </div>
            <ul>
            ${wrong_questions.map(([k, v]) => `<li class="text-left"><a class="font-semibold">${k}</a>: ${v}</li>`).join("\n")}
            </ul>
            </div>`,
            confirmButtonText: "Play Again?"
        }).then((_) => {
            setTimeout(() => {
                crab_element.find("img")[0].src = "/static/assets/crab_idle.gif";
                num_lives = max_lives;
                create_new_hammer();
                wrong_questions = [];
                set_next_question_set();
            }, 200);

        });
    }

    $("[id^=full_card_]").on("click", function (_) {
        let idx = parseInt($(this).attr("id").slice(-1)) - 1;


        if (question == question_set[idx]) {
            hammers[0][0].remove();
            hammers = [];

            num_correct += 1;
            if (num_lives != 0) {
                show_correct_answer();
            }
        } else {
            if (fast_interval != null) {
                clearInterval(fast_interval);
                fast_interval = null;
            }
            fast_interval = setInterval(update_hammer_locations, 5);
        }


    });

    function game_loop() {
        update_hammer_locations();

        for (let [hammer, _x, _y, _r] of hammers) {
            if (are_colliding(crab_element, hammer)) {                
                bonk_audio.play();

                clearInterval(game_interval);
                if (fast_interval != null) {
                    clearInterval(fast_interval);
                    fast_interval = null;
                }

                crab_element.find("img")[0].src = "/static/assets/crab_death.gif";

                let full_card_elements = $("[id^=full_card_]");
                for (let i = 0; i < 4; ++i) {
                    if (question == question_set[i]) {
                        $(full_card_elements.get(i)).addClass("!border-green-800");
                    } else {
                        $(full_card_elements.get(i)).addClass("!border-red-800");
                    }
                }


                setTimeout(() => {
                    full_card_elements.removeClass("!border-green-800");
                    full_card_elements.removeClass("!border-red-800");

                    wrong_questions.push([question, answer]);

                    hammers[0][0].remove();
                    hammers = [];

                    num_lives -= 1;

                    if (num_lives == 0) {
                        handle_game_over();
                    } else {
                        create_new_hammer();
                        set_next_question_set();
                    }

                    crab_element.find("img")[0].src = "/static/assets/crab_idle.gif";

                    game_interval = setInterval(game_loop, 10);
                }, 1000);

            }
        }

        update_displayed_lives();
    }

    create_new_hammer();

    set_next_question_set();

    let fast_interval = null;
    let game_interval;

    Swal.fire({
        title: "Ready to Play?",
        html: `
        <div class="flex flex-col items-center">
        <div>
        <img src="/static/assets/crab.png">
        <div>
        <div class="my-4">
            This is Clawdius the crab. Some unknown nefarius individual moved Clawdius to a beach with falling hammers! 
            To protect Clawdius from imminent death, you must answer these questions correctly! Good luck.
        </div>
        </div>`,
        confirmButtonText: "Start Game",
    }).then(() => {
        let backtrack = new Audio("/static/assets/backtrack.mp3");
        backtrack.loop = true;
        backtrack.play();

        let waves = new Audio("/static/assets/waves.mp3");  
        waves.loop = true;
        waves.play();

        game_interval = setInterval(game_loop, 25);
    });
});
