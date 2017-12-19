import React from 'react';
import renderer from 'react-test-renderer'
import Registro from '../src/componentes/Registro';

describe('Registro (snpashot)', () => {
  it('El componente de Registro se renderiza correctamente', () => {
    const component = renderer.create(<Registro />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
