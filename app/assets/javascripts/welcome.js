$(function(){
  $("#submit_button").click(function(){
    swal({
      title: 'Your Wish',
      confirmButtonText: 'Submit',
      html:
        '<input id="contact" class="swal2-input" placeholder="Email/Phone Number/Skype">' +
        '<textarea id="content" class="swal2-textarea" placeholder="Your wish">',
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          if($("#contact").val() == '') {
            reject('Let us know your contact so we can contact you.');
            $("#contact").focus();
            return;
          }
          if($("#content").val() == '') {
            $("#content").focus();
            reject('Let us know your wish so we could help.');
            return;
          }

          $.ajax({
            type: "POST",
            url: "/wishes",
            data: {
              wish: {
                contact: $("#contact").val(),
                content: $("#content").val()
              }
            },
            success: function(data){
              if(data.status == 200) {
                resolve(data.ResultJson)
              } else {
                reject(data.errors);
              }
            }
          });
        })
      },
      onOpen: function () {
        $('#swal-input1').focus()
      }
    }).then(function (result) {
      swal(
        'Awesome',
        'We got your wish, will contact you soon',
        'success'
      )
    }).catch(swal.noop)
  })
})
