export const getEstadoText = num => {
    return ['success', 'warning', 'danger'][num-1]
}