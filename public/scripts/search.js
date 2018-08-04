$('#cafe-search').on('input', function() {
  var search = $(this).serialize();
  if(search === "search=") {
    search = "all"
  }
  $.get('/cafes?' + search, function(data) {
    $('#cafe-grid').html('');
    data.forEach(function(cafe) {
      $('#cafe-grid').append(`
        <div class="col-md-3 col-sm-6">
          <div class="thumbnail">
            <img src="${ cafe.image }">
            <div class="caption">
              <h4>${ cafe.name }</h4>
            </div>
            <p>
              <a href="/cafes/${ cafe._id }" class="btn btn-primary">More Info</a>
            </p>
          </div>
        </div>
      `);
    });
  });
});

$('#cafe-search').submit(function(event) {
  event.preventDefault();
});