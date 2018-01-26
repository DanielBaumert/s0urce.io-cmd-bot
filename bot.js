// ==UserScript==
// @name         s0urce.io - The Hacking Game
// @version      1.0.0
// @match        http*://s0urce.io/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require      https://raw.githubusercontent.com/brandonaaron/livequery/1.1.1/jquery.livequery.js
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// ==/UserScript==

(function() {
    console.log("insert");
    var scripts = document.getElementsByTagName("script");

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    var imageField = document.querySelector('.tool-type-img');
    var textField = document.querySelector('#tool-type-word');

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == "attributes") {

                var link = imageField.src;

                $.get(link, function(data) {
                    var md5Img = MD5(data);
                    var result = list.filter(function(item) {
                        return item.md5Key == md5Img;
                    });
                    var word = result[0].value;
                    setTimeout(world.lenght * 20, function() { textField.value = word; } );
                });
            }
        });
    });

    observer.observe(imageField, {
        attributes: true //configure it to listen to attribute changes
    });
})();

var MD5 = function (string) {

        function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }

        function AddUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x,y,z) { return (x & y) | ((~x) & z); }
        function G(x,y,z) { return (x & z) | (y & (~z)); }
        function H(x,y,z) { return (x ^ y ^ z); }
        function I(x,y,z) { return (y ^ (x | (~z))); }

        function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        }

        function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
        }

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        }

        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
        }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

        return temp.toLowerCase();
   };

var list = [
    { md5Key: "b6a425c84e951205ddd35eb7ab999e7e", value: "http" },
    { md5Key: "cab2328023aca54c551ea9bc632be0d0", value: "info" },
    { md5Key: "46ec5a2fca05e4251727544ed920216a", value: "init" },
    { md5Key: "ed773765a6e22be4b33babc3fd92d569", value: "intel" },
    { md5Key: "3d6e1c540bf99d79d207a8baca8476bb", value: "join" },
    { md5Key: "ea4213e7149d95cda2e4b078c1265899", value: "key" },
    { md5Key: "179e1a838f68573a91bfd5329fd5ee52", value: "left" },
    { md5Key: "dd7e936fbcef6f2477ec54b08955b23c", value: "list" },
    { md5Key: "c65115a3bc5367e9316e90a5f1c5c4cc", value: "load" },
    { md5Key: "29ee6f955345ad1afde6fc3a1716df3b", value: "log" },
    { md5Key: "a70fcf4b167e970d60247335ad4898b4", value: "loop" },
    { md5Key: "f95dffc3bbf0e5af3f02f84e0b6131c1", value: "net" },
    { md5Key: "0a1aa0785d556fb3e8bc8c0e8af60857", value: "num" },
    { md5Key: "d5cadda267145cda66e146364667ab87", value: "part" },
    { md5Key: "a13362801c2d5f28ac7379c16f92c8b8", value: "pass" },
    { md5Key: "4f9d6bcd3fb5d0864fa462ddd3f53104", value: "ping" },
    { md5Key: "674c8087be9220ef514e11224f923ef8", value: "point" },
    { md5Key: "3f7c7ad3444d75cf1388c86ff20118e0", value: "poly" },
    { md5Key: "d8ea8b866aabb68b30cd0994ab65119a", value: "port" },
    { md5Key: "a3ee165904b4f4f5c0032c93d62a1de0", value: "remove" },
    { md5Key: "3f877d110d3582887c3ce4e09f729baf", value: "reset" },
    { md5Key: "6342f2113afa1a6faf10b4fef94045f2", value: "right" },
    { md5Key: "e14c9123c040f7de3b7c82aa3dfefa7b", value: "root" },
    { md5Key: "8450e6c5bb1222fe7ef162fbb6588977", value: "send" },
    { md5Key: "4bfb75356e1ec49616e99146cd58b728", value: "set" },
    { md5Key: "cb02716a2dac41b599e3bd8b08c0d496", value: "signal" },
    { md5Key: "e8e1b0b9ab23f7bbcf7f131088cdc88d", value: "size" },
    { md5Key: "4acfa6d1efd7710eaf1355a3ee881359", value: "socket" },
    { md5Key: "1383b048b852878cbb2f645b83b747d1", value: "stat" },
    { md5Key: "a08c7fba83928f067753c433fb7b6997", value: "status" },
    { md5Key: "d3166fd85503fcf163d130d8cc37b026", value: "system" },
    { md5Key: "0a7ba32de9bd515926a75e5198e4faac", value: "temp" },
    { md5Key: "66312920a9dbd813f9edf272c077388a", value: "type" },
    { md5Key: "02b1237d7a9bf796300014efa1c0fa45", value: "upload" },
    { md5Key: "6ec5167d95d45bd58ed59f0131a0f74a", value: "url" },
    { md5Key: "b8d6f9ce5f52f2e3cb9becf4c9bf4a39", value: "user" },
    { md5Key: "91ac3812843212a857b7dd45b0255d7b", value: "val" },
    { md5Key: "53ff67072d7a8982a11f8fee3c02de2c", value: "write" },
    { md5Key: "18d31b79bcdca7285a7785b26bae23f2", value: "xml" },
    { md5Key: "66b9de636d1768f1f2d94c45683de2ff", value: "add" },
    { md5Key: "f5d802df90ac168bd513e7cc53e91d73", value: "add" },
    { md5Key: "daadadbc695b64bd129f74e61f480058", value: "anon" },
    { md5Key: "83fe1657a6b3c38b7eba3204c4a9f213", value: "bit" },
    { md5Key: "96154fa91a1a2b5fa48c24a4a8ab42ec", value: "buffer" },
    { md5Key: "9aa878f75f18a30e0a37a77de074cd31", value: "bytes" },
    { md5Key: "e7ca0811faaddc098846c1f4672f123b", value: "call" },
    { md5Key: "5332781393a1e1c19075a488641cf0bc", value: "client" },
    { md5Key: "08356d38403ff9daa1193a88e0f812ab", value: "com" },
    { md5Key: "5341db4f34ed389a469f15a49e8fd90f", value: "cookies" },
    { md5Key: "0987a7be0e7b24dae6bab9a131c6bc34", value: "count" },
    { md5Key: "124f9ef0ff5ab92abd671accc59bb657", value: "data" },
    { md5Key: "8d52e6843d3702986883954ba2df2fed", value: "delete" },
    { md5Key: "627b4b98e6ddcf333555c6b5a1f8627c", value: "dir" },
    { md5Key: "ea8278d18e3f3118595bf171b0b3b4ff", value: "domain" },
    { md5Key: "559702e4239125688627164ea6b2eba9", value: "emit" },
    { md5Key: "7e15781d1cc260daa4afaab832c040b3", value: "event" },
    { md5Key: "a227731219ac07475f8d561be4a275b1", value: "file" },
    { md5Key: "40d1f6a61bf93a7f383de37516153441", value: "get" },
    { md5Key: "40c18e0e9c219f644e3115e6a98923ae", value: "ghost" },
    { md5Key: "81f434ac9881d1b65d8c965f81694f56", value: "global" },
    { md5Key: "cb4ed8a67dffc9af062c412dd4c3003b", value: "handle" },
    { md5Key: "39dd8b8b5f8aaba460723367793698ef", value: "host" },
    { md5Key: "a5207d0ecc004c2410d11e29f8aefd4b", value: "blockthreat" },
    { md5Key: "a19f57bf3e24cbe8d8dbd2e86bf50da3", value: "bufferpingset" },
    { md5Key: "7cccf809e28896edc8edc7f290b4ad47", value: "callmodule" },
    { md5Key: "9054b1ffbb1fe7870c7c14d85b8a2500", value: "changepassword" },
    { md5Key: "128385da6fd1b43f6b73a8151713949f", value: "changeusername" },
    { md5Key: "e3ed2d2ed69fb7cbf3a4a7c44715cd45", value: "channelsetpackage" },
    { md5Key: "f16ed6fed9eb968915a1f7b088638a9c", value: "checkhttptype" },
    { md5Key: "3b2264de31f48bb1201e5394e01a4fcf", value: "create2axisvector" },
    { md5Key: "248cf06008efff130b05c7e030de95a4", value: "create3axisvector" },
    { md5Key: "c8f509bc0afe6a32931259693596f658", value: "createfilethread" },
    { md5Key: "50e85da1c38bacdbfaf0b2ae4a3efc70", value: "createnewpackage" },
    { md5Key: "0feeca66398b40d974274b6c7a9830ba", value: "createnewsocket" },
    { md5Key: "926ffda1d1e583ce83989254b76baa89", value: "decryptdatabatch" },
    { md5Key: "b7da5a3bed3d63db71d4b64f65eafd35", value: "deleteallids" },
    { md5Key: "0810a5e04ea066b6afa725b001504496", value: "destroybatch" },
    { md5Key: "7432f3b1ed67da36606ffe26187be78a", value: "disconnectchannel" },
    { md5Key: "568a57f498801684a6f37fbd383d4f0c", value: "disconnetserver" },
    { md5Key: "e4c292e9388de934bfc1f80f53752c06", value: "dodecahedron" },
    { md5Key: "7b9b4dd883378582bd75d5adc6005bc1", value: "emitconfiglist" },
    { md5Key: "e20fe9555f4e6796b1eaea375decefd4", value: "encodenewfolder" },
    { md5Key: "946d7a563123e0c26274dad0204f51cb", value: "encryptunpackedbatch" },
    { md5Key: "02f9e961b13d3bceef112745b0124686", value: "eventlistdir" },
    { md5Key: "970b9bfe91b990fce0a84bef9704e9a6", value: "exportconfigpackage" },
    { md5Key: "cc34d778d79fb7d4b324b1e4e1464f57", value: "fileexpresslog" },
    { md5Key: "1711bac4106c6f03a7133989aed2078a", value: "generatecodepack" },
    { md5Key: "e9e170bd7161b3c884498dbc6017e5d8", value: "getdatapassword" },
    { md5Key: "2f70bb3e05c4430529e2e34eeb2760b9", value: "getfirewallchannel" },
    { md5Key: "9c25a1b08dba7061141ff73cfd26bb88", value: "getmysqldomain" },
    { md5Key: "c17e32e84a323d12658ca5d2bebec353", value: "getpartoffile" },
    { md5Key: "84f5eb048ab7ec57a2800d8e6d7b35e9", value: "getxmlprotocol" },
    { md5Key: "b38d1571f774ec44ce631737d8a4a0d8", value: "ghostfilesystem" },
    { md5Key: "740d5d5cdb4d751e839f02ef4a038825", value: "hostnewserver" },
    { md5Key: "dc1734e3a0e680cfc4a2cd7a83f9cb01", value: "httpbuffersize" },
    { md5Key: "d47b236709ebf37140896ac617f54f8f", value: "includedirectory" },
    { md5Key: "4e4736e0138cbe9e0e07fde3871e8f59", value: "joinnetworkclient" },
    { md5Key: "d38ea5968e97b53c4eae2eb092e94320", value: "loadaltevent" },
    { md5Key: "c6b010e677af65871a4a60d5bc9a1829", value: "loadloggedpassword" },
    { md5Key: "dc7cacde1455d48565706552578ac863", value: "loadregisterlist" },
    { md5Key: "f70c09635a97354656c04b3b5bb9ce16", value: "mergesocket" },
    { md5Key: "f606e0eed867b7ae38af20b7d84d0566", value: "patcheventlog" },
    { md5Key: "66edf4af85783327c234a1ec4dccd889", value: "removenewcookie" },
    { md5Key: "74fbce19b7ae118a41b41aa37f132b14", value: "removeoldcookie" },
    { md5Key: "595d1081ea83e2814bc4c95356719611", value: "respondertimeout" },
    { md5Key: "1371d510509b242d6dd5cb44ab2bd933", value: "rootcookieset" },
    { md5Key: "794e310df74875529826e87dc9175090", value: "sendintelpass" },
    { md5Key: "27e882b3999f575c0da08a92ac3eb136", value: "setnewproxy" },
    { md5Key: "08a7ae75d9790d6436d86cd9d886ba59", value: "sizeofhexagon" },
    { md5Key: "4e92f8ac2cd3d17826a51df710d22d22", value: "statusofprocess" },
    { md5Key: "15798b0b6240b1248824fc72019c1b75", value: "systemgridtype" },
    { md5Key: "0599a3a203b4b146986ca8a6d45c8f21", value: "systemportkey" },
    { md5Key: "4eb620c8669b807100b97589bdc16254", value: "tempdatapass" },
    { md5Key: "02e1fce30353e00fbee8ccaf2893c4ec", value: "unpacktmpfile" },
    { md5Key: "0962f1d9ee5ac4880d830240a3c3b3e4", value: "uploaduserstats" },
    { md5Key: "a66ad4f269ad2d09b3fe5a35740670a1", value: "wordcounter" },
    { md5Key: "fb4c0adb4d77fc855287d27c56136744", value: "batchallfiles" },
    { md5Key: "d9d3d4678b70f79ae34e930cac0af5be", value: "account" },
    { md5Key: "4dc4f6e37951fa3a1b76f0de383cbfd8", value: "accountname" },
    { md5Key: "31deb4067be1a679ed424df9048c5ac6", value: "channel" },
    { md5Key: "a4a9003bb5996898107b5bd0bc234928", value: "command" },
    { md5Key: "243004b32e405518df15b66e707bcb00", value: "config" },
    { md5Key: "a068eb573d72906c506c54c98a8eb830", value: "connect" },
    { md5Key: "c51cfb546ff61f72606703d5a862dcef", value: "constructor" },
    { md5Key: "ffaefd3f38c4302165a25f10af06adbc", value: "datatype" },
    { md5Key: "0809740085a333276bb47fc0fb38b275", value: "decrypt" },
    { md5Key: "e63a04af067d912318832b7cf2ef86f9", value: "decryptfile" },
    { md5Key: "68b8f11894f50576d160adc2f598eb76", value: "disconnect" },
    { md5Key: "ab52408c049aa8dc0a277091f818d7af", value: "download" },
    { md5Key: "0e7ca352e9e09ecb7d4f8ccb83800c30", value: "encode" },
    { md5Key: "b0280089a57de75e42e7e9df0988f91b", value: "encrypt" },
    { md5Key: "ccf59d1da39289db9f0f79f57fec9a24", value: "encryptfile" },
    { md5Key: "a78fa4ac07d61797cd90190745aa67fb", value: "eventtype" },
    { md5Key: "fb524d38bbe63be2ecf9fcac53f1e774", value: "export" },
    { md5Key: "42b861636ca6a5d0cf437325d086126e", value: "filedir" },
    { md5Key: "27bcbf205e0d4d23f78b3635b07d952f", value: "filetype" },
    { md5Key: "e427c9371bd2744f567f301564e52b30", value: "fillgrid" },
    { md5Key: "18bf0e0c7bca685824f6d80102f752b0", value: "findpackage" },
    { md5Key: "51bef767aa87abf5254f06d76969057f", value: "generate" },
    { md5Key: "0bdc212eecee3294977998ea97aa5fde", value: "getfile" },
    { md5Key: "0c8b0415f7f0abed279243c16e167c14", value: "getid" },
    { md5Key: "46bbe38a79b4417b229568764521fa3c", value: "getinfo" },
    { md5Key: "9be71957d560e04a2f41ec568ef337d6", value: "getkey" },
    { md5Key: "f4aca1147492f13b6634d584bd020fec", value: "getlog" },
    { md5Key: "25901977a9c003fb6958e7e6191e090e", value: "getpass" },
    { md5Key: "fc11742dc65195a81715a566f62df22b", value: "getping" },
    { md5Key: "36a39d9e63d4bc3cef219baf00cc9f45", value: "gridheight" },
    { md5Key: "24288b8f0bf45717308f3a6fa588801e", value: "gridwidth" },
    { md5Key: "a0b598bfd011a72d1f8c6098a175a4cd", value: "hexagon" },
    { md5Key: "6690bdaeecf312a73290f7aacb927fdb", value: "hostserver" },
    { md5Key: "8bf4aaf76401eae3611a2de864f0c5d1", value: "length" },
    { md5Key: "fed85184650a9c549997ab428b6e2a1c", value: "listconfig" },
    { md5Key: "8e5517cb0f40011b494c17492f0f0530", value: "loadbytes" },
    { md5Key: "1f954a5cdcc92fed6e36973b5ae84b23", value: "module" },
    { md5Key: "9c9089bc076543b8e62e45463c51dfec", value: "mysql" },
    { md5Key: "e23c006bc56a0338d4fef03dbbec4696", value: "newhost" },
    { md5Key: "b2c01c7a2fbf72faa8cba865689fd9bb", value: "newline" },
    { md5Key: "ab4e0830e14b59ec4bafa3b52bf02e95", value: "newserver" },
    { md5Key: "ef2937a8320af6e4ee961d46bdb18233", value: "number" },
    { md5Key: "9711c9ded0c0b6e21830cec8d926ae0d", value: "package" },
    { md5Key: "6d023a570ebf61e1e6cd1f50abb59104", value: "password" },
    { md5Key: "962de1fb270d35f44a3b40776b15a053", value: "process" },
    { md5Key: "4a7c16796a1f1023584a0421c91d6324", value: "protocol" },
    { md5Key: "61be3e1ef3a97456c4f7324a552eec3e", value: "proxy" },
    { md5Key: "fcd672591d8284387180a8763bd352a6", value: "responder" },
    { md5Key: "2730022af611d95adb69d7469658387d", value: "response" },
    { md5Key: "60a5af56b2f742d169cacd24a4e4d3fc", value: "server" },
    { md5Key: "cc7eaeed02ad3d4644dc28e13e8a061e", value: "serverproxy" },
    { md5Key: "f5a30e9795d567565ff4dca3c06b5d1b", value: "setcookie" },
    { md5Key: "51604c8daa94fb20765658a3ab6c106a", value: "setnewid" },
    { md5Key: "ec2b46907cdbd9196838195cb52ed2c8", value: "setping" },
    { md5Key: "1ff8d2ae9077ebf0cfbeed5447088b17", value: "setport" },
    { md5Key: "44593e653d262d973ab9ba9da31ad3a2", value: "setstats" },
    { md5Key: "0ee3d90937a648b0d7f61c545a83acf4", value: "sizeof" },
    { md5Key: "ab4a1c10eb08a8db0d9bef073648161f", value: "syscall" },
    { md5Key: "34f39ed004edb7673a78592caec1a70a", value: "thread" },
    { md5Key: "c733e02c26726973f02f8482b24f984a", value: "threat" },
    { md5Key: "6fa8bb8ffe49ad82ab8dc113ead55f27", value: "urlcheck" },
    { md5Key: "7320e75e839f4ac926b52303a79e92f3", value: "userid" },
    { md5Key: "92d1af16732d4c86edc0d9bf2f1d3fae", value: "username" },
    { md5Key: "549b8a319ad14935cb0af3e9ea86f836", value: "userport" },
    { md5Key: "f0a3ae4fc4cd082fd82631ba3c40ec5d", value: "vector" },
    { md5Key: "1f06f01c345a30563dc29936f8988105", value: "writefile" }
];