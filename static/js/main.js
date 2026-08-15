/* =========================================================
   MAIN.JS
   Mukteswar Behera Portfolio
========================================================= */


/* =========================================================
   1. CUSTOM CURSOR
========================================================= */

const cursorRing = document.querySelector(".cursor-ring");
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;


/*
   Track mouse position
*/
window.addEventListener(
    "pointermove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }

    },
    {
        passive: true
    }
);


/*
   Smooth cursor ring
*/
function animateCursor() {

    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;

    if (cursorRing) {

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

    }

    requestAnimationFrame(animateCursor);
}

animateCursor();



/* =========================================================
   2. LIQUID GLASS NAVIGATION
========================================================= */

const navigation = document.querySelector(".nav");

const glassIndicator = document.querySelector(".nav-glass");

const navigationLinks = [
    ...document.querySelectorAll(".nav-link")
];


/*
   Move liquid-glass indicator
   behind the selected navigation item.
*/
function moveGlassIndicator(activeLink) {

    if (!navigation || !glassIndicator || !activeLink) {
        return;
    }

    const navigationRect =
        navigation.getBoundingClientRect();

    const linkRect =
        activeLink.getBoundingClientRect();


    /*
       Width of the active navigation item
    */
    glassIndicator.style.width =
        `${linkRect.width}px`;


    /*
       Horizontal movement
    */
    const x =
        linkRect.left -
        navigationRect.left -
        6;


    glassIndicator.style.transform =
        `translateX(${x}px)`;

}



/*
   Set active navigation item
*/
function setActiveNavigation(activeLink) {

    if (!activeLink) {
        return;
    }


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

    });


    activeLink.classList.add("active");


    moveGlassIndicator(activeLink);

}



/*
   Initially activate About
*/
const initialActiveLink =
    document.querySelector(".nav-link.active");

moveGlassIndicator(initialActiveLink);



/*
   Navigation click events
*/
navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        setActiveNavigation(link);

    });

});



/*
   Recalculate glass position
   when browser is resized.
*/
window.addEventListener("resize", () => {

    const activeLink =
        document.querySelector(".nav-link.active");

    moveGlassIndicator(activeLink);

});



/* =========================================================
   3. ACTIVE SECTION WHILE SCROLLING
========================================================= */


/*
   Observe sections as they enter the viewport.
*/
const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const sectionID =
                    entry.target.id;


                /*
                   Find navigation link
                   corresponding to section.
                */
                const matchingLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionID}"]`
                    );


                if (!matchingLink) {
                    return;
                }


                setActiveNavigation(
                    matchingLink
                );

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }

    );


/*
   Observe all sections.
*/
document
    .querySelectorAll(".observe")
    .forEach((section) => {

        sectionObserver.observe(section);

    });



/* =========================================================
   4. BUTTON / LINK CURSOR EFFECT
========================================================= */

const interactiveElements =
    document.querySelectorAll(
        "a, button"
    );


interactiveElements.forEach((element) => {


    /*
       Cursor becomes larger
       when hovering an interactive element.
    */
    element.addEventListener(
        "mouseenter",
        () => {

            if (!cursorRing) {
                return;
            }

            cursorRing.style.width = "52px";

            cursorRing.style.height = "52px";

        }
    );


    /*
       Return cursor to normal size.
    */
    element.addEventListener(
        "mouseleave",
        () => {

            if (!cursorRing) {
                return;
            }

            cursorRing.style.width = "34px";

            cursorRing.style.height = "34px";

        }
    );

});



/* =========================================================
   5. MOBILE MENU
========================================================= */

const menuButton =
    document.querySelector(".menu");

const mobileNavigation =
    document.querySelector(".nav");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            if (!mobileNavigation) {
                return;
            }


            mobileNavigation.classList.toggle(
                "mobile-open"
            );


            menuButton.classList.toggle(
                "open"
            );

        }
    );

}



/* =========================================================
   6. CLOSE MOBILE MENU AFTER CLICK
========================================================= */

navigationLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            if (!mobileNavigation) {
                return;
            }


            mobileNavigation.classList.remove(
                "mobile-open"
            );


            if (menuButton) {

                menuButton.classList.remove(
                    "open"
                );

            }

        }
    );

});



/* =========================================================
   7. SMOOTH ANCHOR SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });



/* =========================================================
   8. PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        const activeLink =
            document.querySelector(
                ".nav-link.active"
            );


        moveGlassIndicator(
            activeLink
        );

    }
);