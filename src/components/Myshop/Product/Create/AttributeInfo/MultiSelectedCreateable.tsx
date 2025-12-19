import { useEffect, useState, memo } from 'react';
import { Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { FiChevronDown } from 'react-icons/fi';

interface MultiSelectCreatableProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  canCreate?: boolean;
  label?: string;
  icon?: any;
}

export const MultiSelectCreatable = memo(({
  options,
  value,
  onChange,
  placeholder = "Chọn hoặc tạo mới",
  canCreate = false,
  label,
  icon: Icon
}: MultiSelectCreatableProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    setData(options);
  }, [options]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch('');
    
    if (val === '$create') {
      const newValue = search.trim();
      setData((current) => [...current, newValue]);
      onChange([...value, newValue]);
    } else {
      const newValue = value.includes(val) 
        ? value.filter((v) => v !== val) 
        : [...value, val];
      onChange(newValue);
    }
  };

  const handleValueRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const values = value
    .slice(0, 3)
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

  const filteredOptions = data.filter((item) => 
    item.toLowerCase().includes(search.trim().toLowerCase())
  );

  const options_render = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        <Checkbox 
          size="xs" 
          color="blue"
          checked={value.includes(item)}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
        />
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <div>
      {label && (
        <Input.Label size="sm" mb={5}>
          {label}
        </Input.Label>
      )}
      
      <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
        <Combobox.DropdownTarget>
          <PillsInput 
            rightSection={<FiChevronDown size={16} />} 
            leftSection={Icon ? (
              <div className="text-blue-500 p-1 rounded-full mr-2">
                <Icon size={16}/>
              </div>
            ) : null}
            onClick={() => combobox.toggleDropdown()}
          >
            <Pill.Group>
              {value.length > 0 ? (
                <>
                  {values}
                  {value.length > 3 && (
                    <Pill>+{value.length - 3} more</Pill>
                  )}
                </>
              ) : (
                <Input.Placeholder>{placeholder}</Input.Placeholder>
              )}
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Tìm kiếm..."
          />
          <Combobox.Options>
            {options_render}

            {canCreate && !exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">+ Tạo "{search}"</Combobox.Option>
            )}

            {filteredOptions.length === 0 && search.trim().length === 0 && (
              <Combobox.Empty>Không có tùy chọn</Combobox.Empty>
            )}

            {filteredOptions.length === 0 && search.trim().length > 0 && (
              <Combobox.Empty>Không tìm thấy</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
});