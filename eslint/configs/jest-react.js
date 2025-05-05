import { defineConfig } from 'eslint/config';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig(testingLibrary.configs['flat/react']);
