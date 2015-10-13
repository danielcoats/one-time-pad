(function(){

    var largePopoverTour =
        "<div class='popover tour tour-large'> \
        <div class='arrow'></div> \
        <h3 class='popover-title'></h3> \
        <div class='popover-content'></div> \
        <div class='popover-navigation'> \
        <div class='btn-group'> \
            <button class='btn btn-sm btn-default disabled' data-role='prev'>« Prev</button> \
            <button class='btn btn-sm btn-default disabled' data-role='next'>Next »</button> \
        </div> \
        <button class='btn btn-sm btn-default' data-role='end'>End tour</button> \
        </div> \
        </div>";

    var tour = new Tour({
        storage : false
    });

    tour.addSteps([
        {
            title: "Welcome",
            content:"",
            template: largePopoverTour,
            backdrop: true,
            orphan: true
        },

    ]);

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();

}());
