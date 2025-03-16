import { ScreensScreen }    from '/src/@/screens/Screens'
import { ScreensContainer } from '/src/@/segments/composition/ScreensContainer'
import { useGeneration }    from '/src/@/services/generation'
import { BottomButton }     from '/src/@/shared/ui-kit/BottomButton'

export
function UpdateImagesFlow
()
{
    const { generate } = useGeneration()

    return (
        <ScreensContainer>
            <ScreensScreen />

            <BottomButton onClick={generate}>
                Save & update
            </BottomButton>
        </ScreensContainer>
    )
}
