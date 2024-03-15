import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) =>
      // En utilisant .sort de cette façon, nous pouvons trier les events par ordre décroissant
      new Date(evtB.date) - new Date(evtA.date)
  );

  // console.log("Par date de description", byDateDesc); // ok c'est décroissant par date

  // Exemple :
  // const numbers = [5, 2, 9, 1, 5, 6];
  // numbers.sort((a, b) => b - a); // Tri décroissant
  // console.log(numbers); // Affiche [9, 6, 5, 5, 2, 1]

  const nextCard = () => {
    setTimeout(
      () =>
        // Ne pas oubliez length - 1 fin du tableau
        setIndex(byDateDesc && index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // La key doit être unique pour chaque élement
        <div key={event.title}>
          <div
            // mauvais emplacement de la key={event.title}
            // key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_.title}`}
                  type="radio"
                  name="radio-button"
                  // Les dots ne fonctionne pas
                  // utiliser l'index du tableau byDateDesc
                  // index === à l'image (cover)
                  checked={index === radioIdx}
                  // checked={idx === radioIdx}
                  // Erreur console
                  // Ajout readOnly ou onChange suite à l'erreur de la console
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
