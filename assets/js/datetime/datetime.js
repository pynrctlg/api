var datetime = {
    defaults: {
        currentDate: new Date(),
        totalYear: 80,
        daySelector: '#day',
        monthSelector: '#month',
        yearSelector: '#year',
        resultSelector: '#hdBirthdate'
    },

    init: function (selectedDay, selectedMonth, selectedYear) {
        this.renderYear(selectedYear);

        $(this.defaults.yearSelector).trigger('change');

        this.renderMonth(selectedMonth);

        $(this.defaults.monthSelector).trigger('change');

        this.renderDay(selectedDay);

        $(this.defaults.daySelector).trigger('change');

        $('body').on('change', this.defaults.yearSelector, function () {
            datetime.renderMonth();
        })
        $('body').on('change', this.defaults.monthSelector, function () {
            datetime.renderDay()
        })
        $('body').on('change', this.defaults.daySelector, function () {
            datetime.setResultValue();
        })
        
    },

    getDays: function () {
        var selectedYear = $(this.defaults.yearSelector).val();
        var selectedMonth = $(this.defaults.monthSelector).val();

        return new Date(selectedYear, selectedMonth, 0).getDate();
    },

    renderYear: function (selectedVal) {
        selectedVal = selectedVal || $(this.defaults.yearSelector).val();

        var currentYear = this.defaults.currentDate.getFullYear();

        $(this.defaults.yearSelector).empty();

        for (var i = 0; i < this.defaults.totalYear; i++) {
            $(this.defaults.yearSelector).append('<option value="' + (currentYear - i) + '">' + (currentYear - i) + '</option>');
        }
        if (selectedVal) {
            $(this.defaults.yearSelector).val(selectedVal);
        }
        this.renderMonth();
    },

    renderMonth: function (selectedVal) {
        selectedVal = selectedVal || $(this.defaults.monthSelector).val();

        $(this.defaults.monthSelector).empty();

        for (var i = 1; i <= 12; i++) {
            $(this.defaults.monthSelector).append('<option value="' + i + '">' + i + '</option>');
        }

        if (selectedVal) {
            $(this.defaults.monthSelector).val(selectedVal);
        }
        this.renderDay();
    },

    renderDay: function (selectedVal) {
        selectedVal = selectedVal || $(this.defaults.daySelector).val();

        var totalDays = this.getDays();

        $(this.defaults.daySelector).empty();

        for (var i = 1; i <= totalDays; i++) {
            $(this.defaults.daySelector).append('<option value="' + i + '">' + i + '</option>');
        }

        if (selectedVal) {
            selectedVal = +selectedVal;
            if (selectedVal > totalDays) {
                selectedVal = 1;
            }
            $(this.defaults.daySelector).val(selectedVal);
        }
        datetime.setResultValue();
    },
    setResultValue: function () {
        var year = $(this.defaults.yearSelector).val();
        var month = $(this.defaults.monthSelector).val();
        var day = $(this.defaults.daySelector).val();
        $(this.defaults.resultSelector).val(year + "-" + month + "-" + day);
    }
};
$(function () {
    datetime.init();
})