import React from 'react';
import {
  StyledForm,
  StyledInput,
  StyledCategoryName,
  StyledSearchButton,
  StyledTagsInput,
  StyledSearchTag,
  StyledAutocompleteRenderInput
} from './search-box.style';
import { SearchIcon } from 'assets/icons/SearchIcon';
import { CloseIcon } from 'assets/icons/CloseIcon';



interface Props {
  onEnter: (e: React.SyntheticEvent) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  minimal?: boolean;
  className?: string;
  showButtonText?: boolean;
  shadow?: string;
  [key: string]: unknown;
}


export const SearchBox: React.FC<Props> = ({
  onEnter,
  onChange,
  value,
  name,
  minimal,
  categoryType,
  buttonText,
  className,
  showButtonText = true,
  shadow,
  ...rest
}) => {
  const [state, setState] = React.useState({tags: []})
  const handleChange = (tags) => {setState({tags})}


  function defaultRenderTag (props) {
    let {tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other} = props
    return (
      <a className={classNameRemove} style={{ cursor: "pointer" }} onClick={(e) => onRemove(key)} >
      <StyledSearchTag key={key} {...other}>
      {getTagDisplayValue(tag)}
        {!disabled &&
          <span style={{ marginLeft:  8, marginRight: 0, fontWeight: 100 }}>
          <CloseIcon />
          </span>
        }
      </StyledSearchTag>
      </a>
    )
  }
  function defaultRenderInput ({addTag, ...props}) {
    let {onChange, value, ...other} = props
    return (
      <StyledAutocompleteRenderInput addTag={addTag}
                               type='search' onChange={onChange} value={value} {...other} />
    )
  }

  return (
    <StyledForm
      onSubmit={onEnter}
      className={className}
      boxShadow={shadow}
      minimal={minimal}
    >
      {minimal ? (
        <>
          <SearchIcon style={{ marginLeft: 16, marginRight: 16 }} />
          <StyledTagsInput placeholder={"What are you looking for.."} renderTag={defaultRenderTag}  renderInput={defaultRenderInput} value={state.tags} onChange={handleChange} />
        </>
      ) : (
        <>
          <StyledCategoryName>{categoryType}</StyledCategoryName>
          <StyledTagsInput placeholder={"What are you looking for.."} renderTag={defaultRenderTag}  renderInput={defaultRenderInput} value={state.tags} onChange={handleChange} />
          <StyledSearchButton>
            <SearchIcon style={{ marginRight: 10, marginLeft: 10 }} />
            {showButtonText && buttonText}
          </StyledSearchButton>
        </>
      )}
    </StyledForm>
  );
};
