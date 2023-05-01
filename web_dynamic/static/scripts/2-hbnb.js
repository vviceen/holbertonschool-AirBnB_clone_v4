#!/usr/bin/node

$(document).ready(function () {
    let amenities = {};
    $(document).on('change', "input[type='checkbox']", function () {
      if (this.checked) {
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenities[$(this).data('id')];
      }
      lista = Object.values(amenities);
      if (lista.length > 0) {
        $('.amenities > h4').text(lista.join(', '));
      } else {
        $('.amenities > h4').html('&nbsp;')
      }
    });
  });
  
  $.get('http://localhost:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success' && data.status === 'OK') {
      $("#api_status").addClass('available');
    } else {
      $("#api_status").removeClass('available');
    }
  });
  
  $(document).ready(function () {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        data.forEach((place) => {
          $.get('http://localhost:5001/api/v1/users/' + place.user_id, function(user) {
            const html = `
            <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms } Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
            </div>
            <div class="user">
                      <b>Owner:</b> ${user.first_name} ${user.last_name}
                  </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
            `;
          $('section.places').append(html);
          });
        })
      }
    });
  });