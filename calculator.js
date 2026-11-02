/* ==========================================================================
   NEXT LEVEL GAMING - INTEGRATED PRICE MULTIPLIER & VALIDATION CALCULATOR
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('feesForm');
    const discountSelect = document.getElementById('discounts');
    const checkBoxes = document.querySelectorAll('.pkg-checkbox');
    const calcBtn = document.getElementById('calcBtn');
    const resultsBox = document.getElementById('calcResults');

    //  A. Auto-Choose Dropdown Tiers while clicking checkboxes real-time
    checkBoxes.forEach(box => {
        box.addEventListener('change', function() {
            let selectedCount = document.querySelectorAll('.pkg-checkbox:checked').length;
            
            if (selectedCount === 0 || selectedCount === 1) {
                discountSelect.value = "0";
            } else if (selectedCount === 2) {
                discountSelect.value = "5";
            } else if (selectedCount === 3) {
                discountSelect.value = "10";
            } else if (selectedCount >= 4) {
                discountSelect.value = "15";
            }
        });
    });

    //  B. Calculation Logic Function
    function performCalculations() {
        let baseTotal = 0;
        let selectedBoxes = document.querySelectorAll('.pkg-checkbox:checked');
        
        selectedBoxes.forEach(box => {
            baseTotal += parseFloat(box.getAttribute('data-price'));
        });

        let discountPercent = parseInt(discountSelect.value);
        let discountAmount = baseTotal * (discountPercent / 100);
        let finalTotal = baseTotal - discountAmount;

        // Display nicely formatted local currency metrics text breakdown
        resultsBox.innerHTML = `
            <h3 style="margin-top:0; color:#18a10b;">Price Breakdown</h3>
            <p style="margin: 5px 0; color: white;">Selected Packages: <b>${selectedBoxes.length}</b></p>
            <p style="margin: 5px 0; color: white;">Subtotal: <b>R ${baseTotal.toFixed(2)}</b></p>
            <p style="margin: 5px 0; color: #18a10b; ;">Discount Tier Applied: <b>${discountPercent}% Off (-R ${discountAmount.toFixed(2)})</b></p>
            <hr style="border-color:#334455;">
            <h4 style="margin: 10px 0 0 0; color: white; font-size:20px;">Total Fees: <span style="color:#18a10b; font-size:24px;">R ${finalTotal.toFixed(2)}</span></h4>
        `;
        resultsBox.style.display = "block";
        window.scrollTo({ top: resultsBox.offsetTop - 20, behavior: 'smooth' });
        return selectedBoxes.length > 0;
    }

    // Bind standalone calculation process directly to click command
    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            const pkgError = document.getElementById('pkgError');
            pkgError.classList.remove('show-error');
            
            let hasSelection = performCalculations();
            if (!hasSelection) {
                pkgError.classList.add('show-error');
                resultsBox.style.display = "none";
            }
        });
    }

    // C. Final Submission Validation Logic Suite
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Lock reload tracking paths
            
            let isValid = true;
            form.classList.add('was-validated');

            // logic to clear previous error messages and invalid borders
            const errorMessages = document.querySelectorAll('.error-msg');
            errorMessages.forEach(msg => msg.classList.remove('show-error'));
            
            const inputs = document.querySelectorAll('#feesForm input');
            inputs.forEach(input => input.classList.remove('invalid-border'));

            // Elements check parameters references mapping
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone');
            const checkinField = document.getElementById('checkin');

            // Form inputs validation tracks
            if (nameField.value.trim() === '') {
                document.getElementById('nameError').classList.add('show-error');
                nameField.classList.add('invalid-border');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                document.getElementById('emailError').classList.add('show-error');
                emailField.classList.add('invalid-border');
                isValid = false;
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phoneField.value.trim())) {
                document.getElementById('phoneError').classList.add('show-error');
                phoneField.classList.add('invalid-border');
                isValid = false;
            }

            if (document.querySelectorAll('.pkg-checkbox:checked').length === 0) {
                document.getElementById('pkgError').classList.add('show-error');
                isValid = false;
            }

            if (checkinField.value === '') {
                document.getElementById('dateError').classList.add('show-error');
                checkinField.classList.add('invalid-border');
                isValid = false;
            }

            if (isValid) {
                // Execute calculation breakdown metrics layout capture right on success
                performCalculations();
                alert('Booking processed successfully! Your discount multiplier has been verified.');
                form.reset();
                form.classList.remove('was-validated');
                resultsBox.style.display = "none";
            }
        });
    }
});
