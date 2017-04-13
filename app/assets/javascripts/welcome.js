$(function(){
  $("#submit_button").click(function(){
    swal({
      title: 'Your Wish',
      confirmButtonText: 'Submit',
      html:
        '<input id="customer_name" class="swal2-input" placeholder="Email/Phone Number/Skype">' +
        '<textarea id="customer_wish" class="swal2-textarea" placeholder="Your wish">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          $.ajax({
            type: "POST",
            url: "/wishes",
            success: function(data){
              if(data.Status == "1"){
                resolve(data.ResultJson)
              }else{
                reject(data.ErrMsg);
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
