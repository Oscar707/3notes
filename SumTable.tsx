import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface Cell {
  id: string;
  value: string;
}

interface SumTableProps {
  initialRows?: number;
  initialCols?: number;
}

const SumTable: React.FC<SumTableProps> = ({
  initialRows = 3,
  initialCols = 3,
}) => {
  const createInitialData = useCallback(() => {
    const data: Cell[][] = [];
    for (let i = 0; i < initialRows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < initialCols; j++) {
        row.push({
          id: `${i}-${j}`,
          value: '',
        });
      }
      data.push(row);
    }
    return data;
  }, [initialRows, initialCols]);

  const [tableData, setTableData] = useState<Cell[][]>(createInitialData());
  const [editingCell, setEditingCell] = useState<string | null>(null);

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex].value = value;
    setTableData(newData);
  };

  const addRow = () => {
    const newRow: Cell[] = [];
    const colCount = tableData[0]?.length || 1;
    
    for (let j = 0; j < colCount; j++) {
      newRow.push({
        id: `${tableData.length}-${j}`,
        value: '',
      });
    }
    setTableData([...tableData, newRow]);
  };

  const addColumn = () => {
    const newData = tableData.map((row, rowIndex) => [
      ...row,
      {
        id: `${rowIndex}-${row.length}`,
        value: '',
      },
    ]);
    setTableData(newData);
  };

  const isNumeric = (value: string): boolean => {
    const num = parseFloat(value.trim());
    return !isNaN(num) && isFinite(num);
  };

  const calculateColumnSum = (colIndex: number): number => {
    return tableData.reduce((sum, row) => {
      const cellValue = row[colIndex]?.value || '';
      if (isNumeric(cellValue)) {
        return sum + parseFloat(cellValue.trim());
      }
      return sum;
    }, 0);
  };

  const hasNumericValues = (colIndex: number): boolean => {
    return tableData.some(row => {
      const cellValue = row[colIndex]?.value || '';
      return cellValue.trim() !== '' && isNumeric(cellValue);
    });
  };

  const shouldShowSum = !editingCell;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.table}>
            {/* Table Rows */}
            {tableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <View key={cell.id} style={styles.cell}>
                    <TextInput
                      style={styles.cellInput}
                      value={cell.value}
                      onChangeText={(value) => updateCell(rowIndex, colIndex, value)}
                      onFocus={() => setEditingCell(cell.id)}
                      onBlur={() => setEditingCell(null)}
                      multiline
                      placeholder={`${rowIndex + 1},${colIndex + 1}`}
                      placeholderTextColor="#999"
                    />
                  </View>
                ))}
                {/* Add Column Button (only on first row) */}
                {rowIndex === 0 && (
                  <TouchableOpacity style={styles.addButton} onPress={addColumn}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* Sum Row */}
            {shouldShowSum && (
              <View style={styles.sumRow}>
                {tableData[0]?.map((_, colIndex) => (
                  <View key={`sum-${colIndex}`} style={styles.sumCell}>
                    {hasNumericValues(colIndex) ? (
                      <Text style={styles.sumText}>
                        {calculateColumnSum(colIndex).toFixed(2)}
                      </Text>
                    ) : (
                      <Text style={styles.sumText}>-</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Add Row Button */}
            <View style={styles.addRowContainer}>
              <TouchableOpacity style={styles.addRowButton} onPress={addRow}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 50,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cellInput: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  sumRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  sumCell: {
    width: 100,
    height: 40,
    borderRightWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  sumText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  addButton: {
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginLeft: 5,
  },
  addButtonText: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  addRowContainer: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  addRowButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
});

export default SumTable;