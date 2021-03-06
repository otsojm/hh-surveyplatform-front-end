import React from 'react';
import { BarChart, XAxis, YAxis, Bar, Tooltip, Cell } from 'recharts';
import calc from 'lodash';

import '../css/bootstrap.min.css';

function Statistics(value) {

    let statisticsData = [];

    let filteredData = [];

    let sliderValue = ["Täysin samaa mieltä", "Lähes samaa mieltä", "En osaa sanoa", "Lähes eri mieltä", "Täysin eri mieltä"];

    // Calculate the incidence of different answers

    value.forEach(answer => {

        if (JSON.stringify(answer).split('":"')[1].split(" ")[1] !== "Open") {

            if (JSON.stringify(answer).split('":"')[1].split(" ")[1] === "Scope") {

                let i = parseInt(JSON.stringify(answer).split('":"')[1].split(" ")[0]) - 1;

                console.log(i);

                statisticsData.push({ answer: sliderValue[i], incidence: 1 });
            } else {

                statisticsData.push({ answer: JSON.stringify(answer).split('":"')[1].split(" ")[0], incidence: 1 });
            }
        }
    });

    const results = calc(statisticsData)
        .groupBy("answer")
        .map((answer, id) => ({
            answer: id,
            incidence: calc.sumBy(answer, 'incidence'),
        }))
        .value()
    filteredData.push(results);

    // Random colors for BarChart Cells

    statisticsData.length = 0;

    for (let i = 0; i < value.length; i++) {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        statisticsData.push({ color: randomColor })
    }

    return (
        <div style={{ margin: 'auto'}}>
            <BarChart width={600} height={300} data={filteredData[0]}>
                <XAxis dataKey="answer" />
                <YAxis dataKey="incidence" />
                <Tooltip />
                <Bar dataKey="incidence">
                    {statisticsData.map((entry, index) => (
                        <Cell fill={statisticsData[index].color} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
}

export default Statistics;