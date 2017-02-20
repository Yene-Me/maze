function Hex(r, centerX, centerY) {

    this._centerX = centerX;
    this._centerY = centerY;
    this._SLICE = Math.PI * 2 / 6;
    this._NUM_OF_LINE = 6;
    this._radius = r;

    this.hexData = function () {
        this._hex = [];
        for (var i = 0; i < this._NUM_OF_LINE; i += 1) {
            var angle = i * this._SLICE;
            var x = this._centerX + Math.sin(angle) * this._radius;
            var y = this._centerY + Math.cos(angle) * this._radius;
            var z = this._centerY + Math.cos(angle) * this._radius;
            var point = {
                pointX: x,
                pointY: y,
                pointZ: z
            };
            this._hex.push(point);
    }
        
        return this._hex;
    };

    this.drawHex = function (context ,x, y) {
        context.save();
        context.translate(x,y);
        for(var index = 0 ; index < this._hex.length; index++)
        {
            var startPoint =  this._hex[0];
            var item = this._hex[index];
            var next = this._hex[index+1];

            context.beginPath();
            context.moveTo(item.pointX, item.pointY);
            if(next)
            {
                context.lineTo(next.pointX, next.pointY);
            }else
            {
                context.lineTo(startPoint.pointX, startPoint.pointY);
            }

            //context.rect(item.pointX, item.pointY, 3,3);
            //context.arc(item.pointX,item.pointY,2,Math.PI,Math.PI*2);

            //context.closePath();
            context.fillStyle = 'red';
            context.fill();
            context.stroke();
        }
        context.translate(0,0);
        context.restore();
        //console.log(this._hex)
    }

  }

export default Hex;
