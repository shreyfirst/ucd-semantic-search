import React, { useState, useEffect, useRef } from "react";
import { Button } from '@mui/joy'

type Props = {
  text: string
  onChangeText: () => void
}

const DvdScreensaver = (props: Props) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({
    x: Math.round(Math.random()) * 2 - 1,
    y: Math.round(Math.random()) * 2 - 1,
  });  
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: Math.floor(Math.random() * (window.innerWidth - ref.current.clientWidth)),
        y: Math.floor(Math.random() * (window.innerHeight - ref.current.clientHeight)),
      });
      setColor(getRandomPastelColor());
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMove = () => {
      const { x, y } = position;
      const { x: dx, y: dy } = direction;
      const nextX = x + dx * 1;
      const nextY = y + dy * 1;

      if (nextX >= window.innerWidth - ref.current.clientWidth || nextX <= 0) {
        setDirection((d) => ({ ...d, x: -dx }));
        setColor(getRandomPastelColor());
      }
      if (nextY >= window.innerHeight - ref.current.clientHeight || nextY <= 0) {
        setDirection((d) => ({ ...d, y: -dy }));
        setColor(getRandomPastelColor());
      }
      setPosition({ x: nextX, y: nextY });
    };

    const intervalId = setInterval(handleMove, 20);

    return () => clearInterval(intervalId);
  }, [position, direction]);

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 31) + 70; // 70-100
    const lightness = Math.floor(Math.random() * 31) + 70; // 70-100
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <Button ref={ref} className="font" style={{
      position: "absolute",
      top: position.y,
      left: position.x,
      borderRadius: "9px",
      backgroundColor: color,
    }} onClick={props.onChangeText} size="xl">{props.text}</Button>

  );
};

export default DvdScreensaver;
