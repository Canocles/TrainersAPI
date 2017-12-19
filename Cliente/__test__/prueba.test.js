import React from 'react';
import renderer from 'react-test-renderer'
import Bienvenida from '../src/componentes/Bienvenida';

describe('Bienvenida (snpashot)', () => {
  it('La página de Bienvenida se renderiza correctamente', () => {
    const component = renderer.create(<Bienvenida />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
