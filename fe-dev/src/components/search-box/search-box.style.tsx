import styled from 'styled-components';
import css from '@styled-system/css';
import { shadow } from 'styled-system';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import Popover from "src/components/popover/popover";
import {
  Box,
  Flag,
  SelectedItem
} from "src/layouts/header/menu/language-switcher/language-switcher.style";
import {MenuItem} from "src/layouts/header/menu/language-switcher/language-switcher.style";
import PopoverWrapper from "../popover/popover.style";




function states () {
  return [
    {abbr: 'AL', name: 'Alabama'},
    {abbr: 'AK', name: 'Alaska'},
    {abbr: 'AZ', name: 'Arizona'},
    {abbr: 'AR', name: 'Arkansas'},
    {abbr: 'CA', name: 'California'},
    {abbr: 'CO', name: 'Colorado'},
    {abbr: 'CT', name: 'Connecticut'},
    {abbr: 'DE', name: 'Delaware'},
    {abbr: 'FL', name: 'Florida'},
    {abbr: 'GA', name: 'Georgia'},
    {abbr: 'HI', name: 'Hawaii'},
    {abbr: 'ID', name: 'Idaho'},
    {abbr: 'IL', name: 'Illinois'},
    {abbr: 'IN', name: 'Indiana'},
    {abbr: 'IA', name: 'Iowa'},
    {abbr: 'KS', name: 'Kansas'},
    {abbr: 'KY', name: 'Kentucky'},
    {abbr: 'LA', name: 'Louisiana'},
    {abbr: 'ME', name: 'Maine'},
    {abbr: 'MD', name: 'Maryland'},
    {abbr: 'MA', name: 'Massachusetts'},
    {abbr: 'MI', name: 'Michigan'},
    {abbr: 'MN', name: 'Minnesota'},
    {abbr: 'MS', name: 'Mississippi'},
    {abbr: 'MO', name: 'Missouri'},
    {abbr: 'MT', name: 'Montana'},
    {abbr: 'NE', name: 'Nebraska'},
    {abbr: 'NV', name: 'Nevada'},
    {abbr: 'NH', name: 'New Hampshire'},
    {abbr: 'NJ', name: 'New Jersey'},
    {abbr: 'NM', name: 'New Mexico'},
    {abbr: 'NY', name: 'New York'},
    {abbr: 'NC', name: 'North Carolina'},
    {abbr: 'ND', name: 'North Dakota'},
    {abbr: 'OH', name: 'Ohio'},
    {abbr: 'OK', name: 'Oklahoma'},
    {abbr: 'OR', name: 'Oregon'},
    {abbr: 'PA', name: 'Pennsylvania'},
    {abbr: 'RI', name: 'Rhode Island'},
    {abbr: 'SC', name: 'South Carolina'},
    {abbr: 'SD', name: 'South Dakota'},
    {abbr: 'TN', name: 'Tennessee'},
    {abbr: 'TX', name: 'Texas'},
    {abbr: 'UT', name: 'Utah'},
    {abbr: 'VT', name: 'Vermont'},
    {abbr: 'VA', name: 'Virginia'},
    {abbr: 'WA', name: 'Washington'},
    {abbr: 'WV', name: 'West Virginia'},
    {abbr: 'WI', name: 'Wisconsin'},
    {abbr: 'WY', name: 'Wyoming'}
  ]
}

const SuggestionMenu = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <MenuItem value={item.name}>
          <span>{item.name}</span>
        </MenuItem>
      ))}
    </>
  );
};



function renderSuggestionsContainer({ containerProps, children, query }) {
  let suggestions = children?.props?.items || [];

  return (<>
    { suggestions.length > 0 ?
        <Box {...containerProps}>
          <PopoverWrapper className={"user-pages-dropdown"}>
            <div className="popover-content">
              <div className="inner-wrap" >
                <SuggestionMenu items={children.props.items} />
              </div>
            </div>
          </PopoverWrapper>
        </Box> : <></>}
    </>)
}

export const AutocompleteRenderInput = ({addTag, ...props}) => {
  const handleOnChange = (e, {newValue, method}) => {
    if (method === 'enter') {
      e.preventDefault()
    } else {
      props.onChange(e)
    }
  }

  const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
  const inputLength = inputValue.length

  let suggestions = states().filter((state) => {
    return state.name.toLowerCase().slice(0, inputLength) === inputValue
  })

  return (
    <Autosuggest
      ref={props.ref}
      suggestions={suggestions}
      shouldRenderSuggestions={(value) => value && value.trim().length > 0}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={(suggestion) => <span >{suggestion.name}</span>}
      inputProps={{placeholder : "Search your Imagination", className: props.className, value: props.value, onChange: handleOnChange}}
      onSuggestionSelected={(e, {suggestion}) => {
        addTag(suggestion.name)
      }}
      renderSuggestionsContainer={renderSuggestionsContainer}
      onSuggestionsClearRequested={() => {}}
      onSuggestionsFetchRequested={() => {}}
    />
  )
}

export const StyledForm = styled.form<any>(
  (props) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'visible',
    width: props.minimal ? '100%' : 700,
    color: '#77798C',
    backgroundColor: props.minimal ? '#f3f3f3' : '#ffffff',
  }),
  shadow
);



export const StyledAutocompleteRenderInput = styled(AutocompleteRenderInput)(
  css({
    flexGrow: 1,
    fontSize: 15,
    px: 20,
    height: 48,
    color: '#77798C',
    backgroundColor: 'inherit',
  }),
  {
    border: 0,
    '&:focus': {
      outline: 0,
    },

    '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
      fontSize: 15,
      color: '#77798C',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
);


export const StyledInput = styled.input(
  css({
    flexGrow: 1,
    fontSize: 15,
    px: 20,
    height: 48,
    color: '#77798C',
    backgroundColor: 'inherit',
  }),
  {
    border: 0,
    '&:focus': {
      outline: 0,
    },

    '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
      fontSize: 15,
      color: '#77798C',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
);


export const StyledTagsInput = styled(TagsInput)(
  css({
    flexGrow: 1,
    fontSize: 15,
    px: 20,
    height: 48,
    color: '#77798C',
    backgroundColor: 'inherit',
  }),
  {
    border: 0,
    '&:focus': {
      outline: 0,
    },

    '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
      fontSize: 15,
      color: '#77798C',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
);


export const StyledSearchTag = styled.span(
  css({
    display:"inline-block",
    fontSize: 14,
    lineHeight: '38px',
    px: 15,
    color: '#000',
    backgroundColor: '#fafafa',
  }),
  {
    fontWeight: 400,
    margin: '5px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  }
);


export const StyledCategoryName = styled.span(
  css({
    fontSize: 14,
    lineHeight: '38px',
    px: 15,
    color: '#009E7F',
    backgroundColor: '#f7f7f7',
  }),
  {
    fontWeight: 700,
    margin: '5px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  }
);

export const StyledSearchButton = styled.button({
  backgroundColor: '#009E7F',
  fontSize: 15,
  fontWeight: 700,
  color: '#ffffff',
  display: 'flex',
  height: 48,
  alignItems: 'center',
  border: 0,
  outline: 0,
  paddingLeft: 30,
  paddingRight: 30,
  cursor: 'pointer',
  flexShrink: 0,
});
