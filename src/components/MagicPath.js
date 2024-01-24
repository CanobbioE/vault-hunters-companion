import { useEffect, useRef } from "react";


const MagicPath = (props) => {
    const canvasRef = useRef(null);

    const { path } = props

    const roomSize = 10
    const connectionSize = 10

    const roomStyle = (room) => {
        if (room.start) {
            return 'green'
        }
        if (room.marked) {
            return 'red'
        }
        return 'black'
    }

    useEffect(() => {
        const drawRoom = (ctx, room, startX, startY) => {
            ctx.fillStyle = roomStyle(room)
            ctx.beginPath()
            ctx.fillRect(startX, startY, roomSize, roomSize)
        }
    
        const drawConnection = (ctx, startX, startY, direction) => {
            ctx.strokeStyle = 'red'
            const centerY = startY === 0 ? roomSize / 2 : (startY + roomSize / 2)
            const centerX = startX === 0 ? roomSize / 2 : (startX + roomSize / 2)
            switch (direction) {
                case 'E':
                    ctx.moveTo(startX - connectionSize, centerY)
                    ctx.lineTo(startX, centerY)
                    ctx.stroke()
                    break
                case 'W':
                    const westSide = startX + roomSize + connectionSize
                    ctx.moveTo(westSide, centerY)
                    ctx.lineTo(westSide - connectionSize, centerY)
                    ctx.stroke()
                    break
                case 'S':
                    ctx.moveTo(centerX, startY - connectionSize)
                    ctx.lineTo(centerX, startY)
                    ctx.stroke()
                    break
                case 'N':
                    const northSide = startY + roomSize + connectionSize
                    ctx.moveTo(centerX, northSide)
                    ctx.lineTo(centerX, northSide - connectionSize)
                    ctx.stroke()
                    break
                default:
                    break
            }
        }
        const draw = (ctx, path) => {
            let room = path[path.length - 1]
            let startX = roomSize * room.x + connectionSize * room.x
            let startY = roomSize * room.y + connectionSize * room.y
    
            if (!room.start) {
                drawConnection(ctx, startX, startY, room.direction)
            }
            drawRoom(ctx, room, startX, startY)
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context, path);
    }, [path]);


    return <canvas height={460} width={412} ref={canvasRef} {...props} />;
};

export default MagicPath;