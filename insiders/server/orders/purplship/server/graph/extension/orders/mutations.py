import graphene
from graphene.types import generic
from graphene_django.types import ErrorType

from purplship.core.utils import DP
import purplship.server.graph.utils as utils
import purplship.server.orders.models as models
import purplship.server.orders.serializers as serializers
import purplship.server.graph.extension.orders.types as types
import purplship.server.graph.extension.base.inputs as inputs
from purplship.server.orders.serializers.order import (
    OrderSerializer,
    can_mutate_order,
)


class PartialOrderUpdate(utils.ClientMutation):
    order = graphene.Field(types.OrderType)

    class Input:
        id = graphene.String(required=True)
        shipping_address = graphene.Field(inputs.UpdateAddressInput, required=False)
        line_items = graphene.List(inputs.UpdateCommodityInput, required=False)
        options = generic.GenericScalar(required=False)
        metadata = generic.GenericScalar(required=False)

    @classmethod
    @utils.login_required
    def mutate_and_get_payload(cls, root, info, id: str, **inputs):
        order = models.Order.access_by(info.context).get(id=id)
        can_mutate_order(order, update=True)

        serializer = OrderSerializer(
            order,
            context=info.context,
            data=DP.to_dict(inputs),
            partial=True,
        )

        if not serializer.is_valid():
            return cls(errors=ErrorType.from_errors(serializer.errors))

        serializer.save()

        # refetch the shipment to get the updated state with signals processed
        update = models.Order.access_by(info.context).get(id=id)

        return cls(errors=None, order=update)
