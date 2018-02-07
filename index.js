var rp = require('request-promise');

exports.reply = function justReply(req, res) {

    const promises = req.body.events.map(event => {

        var msg = event.message.text;
        var reply_token = event.replyToken;

        var target_albumId = "";

        if( msg.includes( draw ) ){
            target_albumId = oxvVr ;
        }else{
            return;
        }

        var imgur_options = {
            method: 'GET',
            uri: `https://api.imgur.com/3/album/${target_albumId}/images`,
            headers: {
              "Authorization": `Client-ID ${e8ff5e6896f2103}`
            },
            json: true
        };


        return rp(imgur_options)
        .then(function (imgur_response) {

            // collect image urls from the album
            var array_images = [];
            imgur_response.data.forEach(function(item){
                array_images.push(item.link);
            })

            // choose one of images randomly
            var target_imageUrl = array_images[Math.floor(Math.random()*array_images.length)];

            var lineReply_options = {
                method: 'POST',
                uri: "https://api.line.me/v2/bot/message/reply",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Authorization": ` Bearer ${6pjBCDzNi5tQjf5WIK6DEQZjMABCR7yznaFvUcDqVx2Sdvazl5itygtlAHwaL5tfW/i3AvUMX4ibMaM3c8EakzLXiRm0iPBWkgwC9tONiLdHsxu16pIzJoRxyVsuYXuI+iFnyuOUsvYGn5RZhmMDNQdB04t89/1O/w1cDnyilFU=}`
                },
                json: true,
                body: {
                  replyToken: reply_token,
                  messages:[
                    {
                        type: 'image',
                        originalContentUrl: target_imageUrl.replace("http", "https"),
                        previewImageUrl: target_imageUrl.replace("http", "https")
                    }
                  ]
                }
            };

            return rp(lineReply_options);

        })
        .catch(function (err) {
            console.log( err );
        });

    });

    Promise
    .all(promises)
    .then(() => res.json({success: true}));


};
