import style from './main.css';
import { createDisciplineCards, createSelectBox } from '../../src';
import createPie from '../../src/design/atom/pie-chart';
import disciplines from '../assets/disciplines';
import skin from '../assets/skin';

export default (engine) => {
  const {h} = engine;
  const options = {
    skin
  };

  let choices = [{
    label: 'plop',
    checked: false
  },{
    label: 'plup',
    checked: true
  },{
    label: 'ploup',
    checked: true
  }];

  const onToggle = (toggledChoice) => {
    console.log('onToggle', toggledChoice.label);
    choices = choices.map(function(choice){
      if(choice.label === toggledChoice.label){
        choice.checked = !choice.checked;
      }
      return choice;
    });
  }

  const SelectBox = createSelectBox(engine, options);
  const DisciplineCards = createDisciplineCards(engine, options);
  const Pie = createPie(engine, options);

  return (props) => (
    <div>
      <SelectBox
        choices={choices}
        onToggle={onToggle}
      >
      </SelectBox>
      <div className={style.learningTreeDefault}>
        <DisciplineCards disciplines={disciplines}/>
      </div>
    </div>
  );
};

function rand() {
  return Math.round(Math.random()*100);
}

function exampleData() {
  return  [
    {
      'label': 'One',
      'value' : rand()
    } ,
    {
      'label': 'Two',
      'value' : rand()
    } ,
    {
      'label': 'Three',
      'value' : rand()
    } ,
    {
      'label': 'Four',
      'value' : rand()
    } ,
    {
      'label': 'Five',
      'value' : rand()
    } ,
    {
      'label': 'Six',
      'value' : rand()
    } ,
    {
      'label': 'Seven',
      'value' : rand()
    } ,
    {
      'label': 'Eight',
      'value' : rand()
    }
  ];
}
