import { useState } from "react";
import tempMovies from "../temp-movie-list/tempMovies";
import { If } from "./If";

export const TempPickMuvi = () => {
  console.log(tempMovies);
  const [pickedMuvi, setPickedMuvi] = useState(null);
  return (
    <section>
      <If condition={!pickedMuvi}>
        {tempMovies.map((m, i) => {
          return (
            <>
              <div onClick={() => console.log("hehe")}>{m.name}</div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
                className=""
              >
                {m.shows.map((sh) => {
                  return (
                    <span onClick={() => setPickedMuvi([m, sh])}>
                      {sh.time}
                    </span>
                  );
                })}
              </div>
            </>
          );
        })}
      </If>
      <If condition={pickedMuvi}>
        <PickSeat m={pickedMuvi} setM={setPickedMuvi} />
      </If>
    </section>
  );
};

const PickSeat = ({ m, setM }) => {
  return (
    <>
      <div onClick={() => setM(null)}>Back</div>
      <h2>PICK A SEAT</h2>
      <h3>{m[0].name + " " + m[1].time}</h3>
    </>
  );
};
