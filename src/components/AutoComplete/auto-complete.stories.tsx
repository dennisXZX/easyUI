import React, { ReactElement } from 'react';
import AutoComplete, { DataSourceType } from './auto-complete';
import { action } from '@storybook/addon-actions';
import '../../styles/index.scss';

export default {
	component: AutoComplete,
	title: 'AutoComplete'
};

interface IPlayerProps {
	value: string;
	number: number;
}

export const simpleAutoComplete = () => {
	const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];

	const handleFetch = (query: string) => {
		return lakers.filter(name => name.includes(query)).map(name => ({ value: name }));
	};

	return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('selected')} />;
};

export const customTemplateAutoComplete = () => {
	const playersWithNumber = [
		{ value: 'bradley', number: 11 },
		{ value: 'pope', number: 1 },
		{ value: 'caruso', number: 4 },
		{ value: 'cook', number: 2 },
		{ value: 'cousins', number: 15 },
		{ value: 'james', number: 23 },
		{ value: 'AD', number: 3 },
		{ value: 'green', number: 14 },
		{ value: 'howard', number: 39 },
		{ value: 'kuzma', number: 0 }
	];

	const handleFetch = (query: string) => {
		return playersWithNumber.filter(player => player.value.includes(query));
	};

	const renderOption = (item: DataSourceType): ReactElement => {
		const itemWithPlayerProps = item as DataSourceType<IPlayerProps>;

		return (
			<>
				<h2>Name: {itemWithPlayerProps.value}</h2>
				<h2>Number: {itemWithPlayerProps.number}</h2>
			</>
		);
	};

	return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('selected')} renderOption={renderOption} />;
};

export const asynchronousAutoComplete = () => {
	const handleFetch = (query: string) => {
		return fetch(`https://api.github.com/search/users?q=${query}`)
			.then(res => res.json())
			.then(({ items }) => {
				console.log(items);
				return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
			});
	};

	return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('selected')} />;
};
