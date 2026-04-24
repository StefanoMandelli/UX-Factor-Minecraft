document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* DOM References */
    // Steps
    const steps = {
        1: document.getElementById('step1'),
        2: document.getElementById('step2'),
        3: document.getElementById('step3'),
        4: document.getElementById('step4'),
    };

    // Step 1
    const inputCode    = document.getElementById('inputCode');
    const btnStep1Next = document.getElementById('btnStep1Next');

    // Step 2
    const worldCards = document.querySelectorAll('.world-card');

    // Step 3
    const bookingForm   = document.getElementById('bookingForm');
    const inputDate     = document.getElementById('inputDate');
    const inputTime     = document.getElementById('inputTime');
    const inputGuests   = document.getElementById('inputGuests');
    const inputNickname = document.getElementById('inputNickname');
    const inputPhone    = document.getElementById('inputPhone');
    const phonePrefix   = document.getElementById('phonePrefix');
    const btnGuestsUp   = document.getElementById('btnGuestsUp');
    const btnGuestsDown = document.getElementById('btnGuestsDown');

    // Step 4
    const confirmDetails = document.getElementById('confirmDetails');
    const btnCancel      = document.getElementById('btnCancel');

    /* State */
    let currentStep  = 1;
    let selectedWorld = null;
    let bookingData   = {};

    /* Step Navigation */
    function goToStep(stepNumber) {
        // Hide current step
        steps[currentStep].classList.remove('step-active');

        // Show target step
        currentStep = stepNumber;
        steps[currentStep].classList.add('step-active');
    }

    /* Step 1 - Code Input */
    btnStep1Next.addEventListener('click', () => {
        const code = inputCode.value.trim();

        if (!code) {
            inputCode.classList.add('is-invalid');
            shakeElement(inputCode);
            return;
        }

        inputCode.classList.remove('is-invalid');
        bookingData.code = code;
        goToStep(2);
    });

    // Remove invalid state on input
    inputCode.addEventListener('input', () => {
        inputCode.classList.remove('is-invalid');
    });

    // Allow Enter key to proceed
    inputCode.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            btnStep1Next.click();
        }
    });

    /* Step 2 - World Selection */
    worldCards.forEach((card) => {
        card.addEventListener('click', () => {
            // Remove previous selection
            worldCards.forEach((c) => c.classList.remove('selected'));

            // Mark current selection
            card.classList.add('selected');
            selectedWorld = card.dataset.world;
            bookingData.world = selectedWorld;

            // Brief delay then proceed
            setTimeout(() => {
                goToStep(3);
            }, 350);
        });
    });

    /* Step 3 - Guest Stepper */
    btnGuestsUp.addEventListener('click', () => {
        let val = parseInt(inputGuests.value, 10);
        const max = parseInt(inputGuests.max, 10);
        if (val < max) {
            inputGuests.value = val + 1;
        }
    });

    btnGuestsDown.addEventListener('click', () => {
        let val = parseInt(inputGuests.value, 10);
        const min = parseInt(inputGuests.min, 10);
        if (val > min) {
            inputGuests.value = val - 1;
        }
    });

    /* Set Min Date to Today */
    const today = new Date();
    const yyyy  = today.getFullYear();
    const mm    = String(today.getMonth() + 1).padStart(2, '0');
    const dd    = String(today.getDate()).padStart(2, '0');
    inputDate.min = `${yyyy}-${mm}-${dd}`;

    /* Form Submission */
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        const requiredFields = [inputDate, inputTime, inputNickname, inputPhone];

        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validate phone (basic check: at least 6 digits)
        const phoneDigits = inputPhone.value.replace(/\D/g, '');
        if (phoneDigits.length < 6) {
            inputPhone.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            shakeElement(bookingForm.querySelector('.is-invalid'));
            return;
        }

        // Store booking data
        bookingData.date     = inputDate.value;
        bookingData.time     = inputTime.value;
        bookingData.guests   = inputGuests.value;
        bookingData.nickname = inputNickname.value.trim();
        bookingData.phone    = phonePrefix.value + ' ' + inputPhone.value.trim();

        // Build confirmation summary
        const formattedDate = formatDate(bookingData.date);
        confirmDetails.innerHTML =
            `<strong>${bookingData.nickname}</strong>, ti aspettiamo il ` +
            `<strong>${formattedDate}</strong> alle <strong>${bookingData.time}</strong> ` +
            `per <strong>${bookingData.guests}</strong> ${bookingData.guests === '1' ? 'persona' : 'persone'} ` +
            `nel mondo <strong class="world-label-${bookingData.world}">${capitalize(bookingData.world)}</strong>.`;

        goToStep(4);
    });

    // Remove invalid state on input for all form fields
    [inputDate, inputTime, inputNickname, inputPhone].forEach((field) => {
        field.addEventListener('input', () => {
            field.classList.remove('is-invalid');
        });
    });

    /* Step 4 - Cancel Booking */
    btnCancel.addEventListener('click', () => {
        if (confirm('Sei sicuro di voler cancellare la prenotazione?')) {
            // Reset everything
            bookingData   = {};
            selectedWorld = null;
            bookingForm.reset();
            inputGuests.value = 2;
            inputCode.value   = '';
            worldCards.forEach((c) => c.classList.remove('selected'));

            goToStep(1);
        }
    });

    /* Utilities */

    /**
     * Shake animation for invalid fields
     */
    function shakeElement(el) {
        if (!el) return;
        el.classList.add('shake-anim');
        el.addEventListener('animationend', () => {
            el.classList.remove('shake-anim');
        }, { once: true });
    }

    /**
     * Format date string (YYYY-MM-DD) to Italian locale
     */
    function formatDate(dateStr) {
        const [y, m, d] = dateStr.split('-').map(Number);
        const date = new Date(y, m - 1, d);
        return date.toLocaleDateString('it-IT', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    /**
     * Capitalize first letter
     */
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
