import React from 'react';
import './App.css';
import Content from './components/Content';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const options = ['All Time Low','Aqua','21 Savage','Lizzo','Bad Bunny','NewJeans','Peso Pluma','Taylor Swift','The Weeknd','Ariana Grande','Arlo Parks','Ashnikko','Baby Goth','Bad Religion','Bella Poarch','Bella Shmurda','Beyonce','Big Thief','Billie Eilish','Billie Marten','Black Bear','Blake Shelton','Blink 182','Bloc Party','Bring Me The Horizon','Bruno Mars','Burna Boy','Calvin Harris','Camila Cabello','Charlie Puth','Chase Atlantic','Conan Gray','Daddy Yankee','Daniel Caesar','David Guetta','Doja Cat','Domo Genesis','Drake','Dua Lipa','Ed Sheeran','EXO','Fall Out Boy','Foals','Frank Ocean','Fuerza Regida','girl in red','Giveon','Grandson','Green Day','Greta Van Fleet','Gunna','HAIM','Halsey','Harry Styles','Ice Spice','J Cole','Jaira Burns','Japanese Breakfast','Jason Aldean','Jewel','Jhene Aiko','Joan Jett','K Flay','Kali Uchis','Karol G','Keke Palmer','Kendrick Lamar','Lady Gaga','Lana Del Rey','Lil Baby','Lil Durk','Lil Nas X','Lil Yachty','Lorde','Luke Combs','Lykke Li','Machine Gun Kelly','Madison Beer','Miley Cyrus','Morgan Wallen','Mrs GREEN APPLE','Nas','New found glory','Nicki Minaj','NLE Choppa','NOFX','Olivia OBrien','Olivia Rodrigo','OneRepublic','Paramore','Pennywise','Polo G','Portugal the Man','Post Malone','PVRIS','Red Hot Chili Peppers','Remi Wolf','Rihanna','Ruth B','Sam Smith','Saweetie','ScHoolboy Q','Selena Gomez','Shawn Mendes','Skylar Grey','Summer Walker','Swae Lee','SZA','Tai Verdes','Tash Sultana','Tay Keith','Teedra Moses','Tems']
const App = () => {
  return (
    <div className="app">
    <DndProvider backend={HTML5Backend}>
      <Content options={options.sort()}/>
      </DndProvider>
    </div>
  );
};

export default App;

