/* =========================================================
   PARTICLES.JS
   Interactive MUKTESWAR BEHERA Typography
========================================================= */


const canvas =
    document.getElementById(
        "particleCanvas"
    );


/*
   Stop if canvas doesn't exist.
*/
if (!canvas) {

    console.warn(
        "particleCanvas was not found."
    );

} else {


    /* =====================================================
       CANVAS SETUP
    ===================================================== */

    const ctx =
        canvas.getContext("2d");


    let canvasWidth = 0;

    let canvasHeight = 0;

    let devicePixelRatioValue = 1;



    /* =====================================================
       PARTICLE STORAGE
    ===================================================== */

    let particles = [];



    /* =====================================================
       MOUSE
    ===================================================== */

    let mouseX = -9999;

    let mouseY = -9999;

    let previousMouseX = -9999;

    let previousMouseY = -9999;

    let mouseSpeed = 0;

    let mouseInside = false;



    /* =====================================================
       SETTINGS
    ===================================================== */

    const SETTINGS = {

        /*
           Text displayed by particles.
        */
        lineOne: "MUKTESWAR",

        lineTwo: "BEHERA",


        /*
           Particle spacing.
           Smaller = more particles.
        */
        desktopGap: 4,

        mobileGap: 5,


        /*
           Cursor interaction radius.
        */
        interactionRadius: 180,


        /*
           How strongly particles return.
        */
        returnForce: 0.018,


        /*
           Particle friction.
        */
        friction: 0.86,


        /*
           Basic cursor force.
        */
        baseForce: 4.5,


        /*
           Maximum additional
           cursor-speed force.
        */
        speedForce: 0.20,


        /*
           Gold particle percentage.
        */
        goldParticleChance: 0.035

    };



    /* =====================================================
       RESIZE CANVAS
    ===================================================== */

    function resizeCanvas() {

        const rect =
            canvas.getBoundingClientRect();


        canvasWidth =
            rect.width;


        canvasHeight =
            rect.height;


        /*
           Limit DPR so very high-resolution
           screens don't destroy performance.
        */
        devicePixelRatioValue =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            Math.floor(
                canvasWidth *
                devicePixelRatioValue
            );


        canvas.height =
            Math.floor(
                canvasHeight *
                devicePixelRatioValue
            );


        /*
           Make drawing coordinates
           match CSS pixels.
        */
        ctx.setTransform(
            devicePixelRatioValue,
            0,
            0,
            devicePixelRatioValue,
            0,
            0
        );


        /*
           Recreate the typography
           after resizing.
        */
        createTextParticles();

    }



    /* =====================================================
       CREATE TEXT PARTICLES
    ===================================================== */

    function createTextParticles() {

        particles = [];


        /*
           Temporary canvas.

           We use this canvas only to determine
           which pixels belong to the letters.
        */
        const textCanvas =
            document.createElement(
                "canvas"
            );


        textCanvas.width =
            Math.ceil(canvasWidth);


        textCanvas.height =
            Math.ceil(canvasHeight);


        const textContext =
            textCanvas.getContext("2d");


        /*
           Responsive font size.
        */
        let fontSize =
            Math.min(
                canvasWidth * 0.115,
                155
            );


        /*
           Smaller font on mobile.
        */
        if (canvasWidth < 700) {

            fontSize =
                Math.min(
                    canvasWidth * 0.115,
                    60
                );

        }


        /*
           Line spacing.
        */
        const lineHeight =
            fontSize * 0.95;


        /*
           Draw the text.
        */
        textContext.fillStyle =
            "#000000";


        textContext.font =
            `700 ${fontSize}px Arial`;


        textContext.textAlign =
            "center";


        textContext.textBaseline =
            "middle";


        /*
           First line.
        */
        textContext.fillText(

            SETTINGS.lineOne,

            canvasWidth / 2,

            canvasHeight / 2 -
            lineHeight * 0.52

        );


        /*
           Second line.
        */
        textContext.fillText(

            SETTINGS.lineTwo,

            canvasWidth / 2,

            canvasHeight / 2 +
            lineHeight * 0.52

        );



        /* =================================================
           READ TEXT PIXELS
        ================================================= */

        const imageData =
            textContext.getImageData(
                0,
                0,
                Math.ceil(canvasWidth),
                Math.ceil(canvasHeight)
            );


        const pixels =
            imageData.data;


        /*
           Choose particle spacing.
        */
        const gap =
            canvasWidth < 700
                ? SETTINGS.mobileGap
                : SETTINGS.desktopGap;



        /* =================================================
           CREATE PARTICLES FROM LETTER PIXELS
        ================================================= */

        for (
            let y = 0;
            y < canvasHeight;
            y += gap
        ) {

            for (
                let x = 0;
                x < canvasWidth;
                x += gap
            ) {


                /*
                   Find pixel position
                   inside image data.
                */
                const pixelIndex =
                    (
                        y *
                        Math.ceil(canvasWidth) +
                        x
                    ) * 4;


                /*
                   Alpha channel.
                */
                const alpha =
                    pixels[
                        pixelIndex + 3
                    ];


                /*
                   If this pixel belongs
                   to the text, create particle.
                */
                if (alpha > 150) {

                    particles.push({

                        /*
                           Current position.
                        */
                        x: x,

                        y: y,


                        /*
                           Original position.

                           Particles return here.
                        */
                        baseX: x,

                        baseY: y,


                        /*
                           Velocity.
                        */
                        vx: 0,

                        vy: 0,


                        /*
                           Particle size.
                        */
                        size:
                            Math.random() *
                            1.25 +
                            0.75,


                        /*
                           A few particles
                           become gold.
                        */
                        gold:
                            Math.random() <
                            SETTINGS.goldParticleChance

                    });

                }

            }

        }

    }



    /* =====================================================
       MOUSE MOVE
    ===================================================== */

    canvas.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                canvas.getBoundingClientRect();


            const newX =
                event.clientX -
                rect.left;


            const newY =
                event.clientY -
                rect.top;


            /*
               Calculate cursor speed.
            */
            if (
                previousMouseX !== -9999
            ) {

                const dx =
                    newX -
                    previousMouseX;


                const dy =
                    newY -
                    previousMouseY;


                mouseSpeed =
                    Math.min(
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        ),
                        80
                    );

            }


            previousMouseX =
                newX;


            previousMouseY =
                newY;


            mouseX =
                newX;


            mouseY =
                newY;


            mouseInside =
                true;

        }
    );



    /* =====================================================
       MOUSE ENTER
    ===================================================== */

    canvas.addEventListener(
        "pointerenter",
        () => {

            mouseInside = true;

        }
    );



    /* =====================================================
       MOUSE LEAVE
    ===================================================== */

    canvas.addEventListener(
        "pointerleave",
        () => {

            mouseInside = false;


            /*
               Put cursor far away.

               Particles will automatically
               start returning.
            */
            mouseX = -9999;

            mouseY = -9999;


            mouseSpeed = 0;

            previousMouseX = -9999;

            previousMouseY = -9999;

        }
    );



    /* =====================================================
       UPDATE PARTICLES
    ===================================================== */

    function updateParticles() {


        /*
           Interaction radius.
        */
        const radius =
            Math.min(
                SETTINGS.interactionRadius,
                Math.max(
                    120,
                    canvasWidth * 0.12
                )
            );


        for (
            const particle of particles
        ) {


            /*
               Difference between
               particle and cursor.
            */
            const dx =
                particle.x -
                mouseX;


            const dy =
                particle.y -
                mouseY;


            /*
               Distance from cursor.
            */
            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );



            /* =================================================
               CURSOR REPULSION
            ================================================= */

            if (
                mouseInside &&
                distance < radius
            ) {


                /*
                   Strength increases
                   as cursor gets closer.
                */
                const force =
                    1 -
                    distance /
                    radius;


                /*
                   Direction away
                   from cursor.
                */
                const angle =
                    Math.atan2(
                        dy,
                        dx
                    );


                /*
                   Cursor speed adds
                   extra force.
                */
                const burst =
                    (
                        SETTINGS.baseForce +
                        mouseSpeed *
                        SETTINGS.speedForce
                    ) *
                    force;


                /*
                   Push particle away.
                */
                particle.vx +=
                    Math.cos(angle) *
                    burst;


                particle.vy +=
                    Math.sin(angle) *
                    burst;



                /* =================================================
                   SIDEWAYS TURBULENCE
                ================================================= */

                /*
                   Add sideways force so
                   particles don't only move
                   directly away.

                   This creates the fluid
                   scattered effect.
                */
                particle.vx +=
                    (
                        -Math.sin(angle)
                    ) *
                    force *
                    1.25;


                particle.vy +=
                    (
                        Math.cos(angle)
                    ) *
                    force *
                    1.25;

            }



            /* =================================================
               SPRING BACK
            ================================================= */

            /*
               Calculate distance from
               original position.
            */
            const returnX =
                particle.baseX -
                particle.x;


            const returnY =
                particle.baseY -
                particle.y;


            /*
               Spring force.
            */
            particle.vx +=
                returnX *
                SETTINGS.returnForce;


            particle.vy +=
                returnY *
                SETTINGS.returnForce;



            /* =================================================
               FRICTION
            ================================================= */

            particle.vx *=
                SETTINGS.friction;


            particle.vy *=
                SETTINGS.friction;



            /* =================================================
               MOVE PARTICLE
            ================================================= */

            particle.x +=
                particle.vx;


            particle.y +=
                particle.vy;

        }


        /*
           Cursor speed gradually decreases.
        */
        mouseSpeed *= 0.90;

    }



    /* =====================================================
       DRAW PARTICLES
    ===================================================== */

    function drawParticles() {


        /*
           Clear previous frame.
        */
        ctx.clearRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );


        /*
           Draw every particle.
        */
        for (
            const particle of particles
        ) {

            ctx.beginPath();


            ctx.arc(

                particle.x,

                particle.y,

                particle.size,

                0,

                Math.PI * 2

            );


            /*
               Gold or black.
            */
            ctx.fillStyle =
                particle.gold
                    ? "#bd8a3b"
                    : "#171615";


            ctx.fill();

        }



        /* =================================================
           CURSOR MAGNETIC FIELD
        ================================================= */

        if (
            mouseInside &&
            mouseX > -100 &&
            mouseY > -100
        ) {

            ctx.beginPath();


            const cursorRadius =
                36 +
                Math.min(
                    mouseSpeed,
                    20
                ) *
                0.35;


            ctx.arc(

                mouseX,

                mouseY,

                cursorRadius,

                0,

                Math.PI * 2

            );


            ctx.strokeStyle =
                "rgba(189,138,59,0.55)";


            ctx.lineWidth = 1;


            ctx.stroke();

        }

    }



    /* =====================================================
       ANIMATION LOOP
    ===================================================== */

    function animateParticles() {

        updateParticles();

        drawParticles();

        requestAnimationFrame(
            animateParticles
        );

    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();

    animateParticles();

}