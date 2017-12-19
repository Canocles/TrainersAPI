import React from 'react';
import renderer from 'react-test-renderer'
import LogeadoBienvenida from '../src/componentes/LogeadoBienvenida';

describe('LogeadoBienvenida (snpashot)', () => {
  it('El componente de LogeadoBienvenida se renderiza correctamente', () => {
    const component = renderer.create(<LogeadoBienvenida />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
